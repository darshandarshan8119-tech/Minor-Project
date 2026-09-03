from django.db import transaction
from django.utils import timezone

from common.idempotency import reserve_idempotency_key
from common.outbox import enqueue_event
from mandi.models import AuctionLot, MerchantBid, Settlement
from users.models import CustomUser, MerchantProfile


class BidRejected(Exception):
    pass


def place_bid(*, merchant: CustomUser, lot_id, bid_amount_per_qtl, idempotency_key: str) -> MerchantBid:
    if merchant.role != CustomUser.Role.MERCHANT or not merchant.is_verified:
        raise BidRejected("Only verified merchants can place bids")

    profile = MerchantProfile.objects.filter(user=merchant).first()
    if not profile or profile.risk_status != MerchantProfile.RiskStatus.NORMAL:
        raise BidRejected("Merchant is not eligible to bid")

    idem = reserve_idempotency_key(
        "mandi.bid.place",
        idempotency_key,
        {"merchant_id": str(merchant.id), "lot_id": str(lot_id), "bid_amount_per_qtl": str(bid_amount_per_qtl)},
    )

    with transaction.atomic():
        lot = AuctionLot.objects.select_for_update().get(id=lot_id)
        if lot.status != AuctionLot.Status.ACTIVE or lot.expires_at <= timezone.now():
            raise BidRejected("Auction lot is not active")
        if bid_amount_per_qtl < lot.reserve_price:
            raise BidRejected("Bid is below reserve price")
        if bid_amount_per_qtl <= lot.current_highest_bid:
            raise BidRejected("Bid must exceed current highest bid")

        if lot.leading_bid_id:
            MerchantBid.objects.filter(id=lot.leading_bid_id).update(status=MerchantBid.Status.OUTBID)

        bid = MerchantBid.objects.create(
            lot=lot,
            merchant=merchant,
            bid_amount_per_qtl=bid_amount_per_qtl,
            idempotency_key=idem.id,
        )
        lot.current_highest_bid = bid_amount_per_qtl
        lot.leading_bid = bid
        lot.save(update_fields=["current_highest_bid", "leading_bid", "updated_at"])
        enqueue_event(
            "auction.bid_placed",
            "mandi_auctionlot",
            lot.id,
            {"lot_id": str(lot.id), "bid_id": str(bid.id), "amount": str(bid_amount_per_qtl)},
        )
        return bid


def settle_expired_lots(limit: int = 100) -> int:
    settled = 0
    with transaction.atomic():
        lots = (
            AuctionLot.objects.select_for_update(skip_locked=True)
            .filter(status=AuctionLot.Status.ACTIVE, expires_at__lte=timezone.now(), leading_bid__isnull=False)
            .order_by("expires_at")[:limit]
        )
        for lot in lots:
            winning_bid = lot.leading_bid
            gross = winning_bid.bid_amount_per_qtl * lot.quantity_quintals
            fee = gross * 0.02
            Settlement.objects.get_or_create(
                lot=lot,
                defaults={
                    "winning_bid": winning_bid,
                    "gross_amount": gross,
                    "platform_fee": fee,
                    "farmer_payout_amount": gross - fee,
                },
            )
            winning_bid.status = MerchantBid.Status.ACCEPTED
            winning_bid.save(update_fields=["status"])
            lot.status = AuctionLot.Status.LOCKED
            lot.save(update_fields=["status", "updated_at"])
            enqueue_event("auction.settled", "mandi_auctionlot", lot.id, {"lot_id": str(lot.id)})
            settled += 1
    return settled

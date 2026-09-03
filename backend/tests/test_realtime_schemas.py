from decimal import Decimal
from uuid import uuid4

import pytest
from pydantic import ValidationError

from realtime.schemas import BidRequest


def test_bid_request_requires_positive_amount():
    payload = BidRequest(lot_id=uuid4(), bid_amount_per_qtl=Decimal("100.00"), idempotency_key="idem-key-12345678")
    assert payload.bid_amount_per_qtl == Decimal("100.00")


def test_bid_request_rejects_zero_amount():
    with pytest.raises(ValidationError):
        BidRequest(lot_id=uuid4(), bid_amount_per_qtl=Decimal("0"), idempotency_key="idem-key-12345678")

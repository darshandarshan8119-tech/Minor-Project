from datetime import datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, Field


class ErrorResponse(BaseModel):
    error_code: str
    detail: str
    trace_id: str | None = None


class BidRequest(BaseModel):
    lot_id: UUID
    bid_amount_per_qtl: Decimal = Field(gt=0)
    idempotency_key: str = Field(min_length=16, max_length=128)


class BidAccepted(BaseModel):
    lot_id: UUID
    bid_id: UUID
    bid_amount_per_qtl: Decimal
    accepted_at: datetime


class CropScanResponse(BaseModel):
    disease_class: str
    severity_score: float = Field(ge=0, le=1)
    confidence: float = Field(ge=0, le=1)
    model_name: str
    model_version: str
    recommended_product_skus: list[str]


class ForecastResponse(BaseModel):
    commodity_id: UUID
    horizon_days: int
    model_name: str
    model_version: str
    generated_at: datetime
    points: list[dict]

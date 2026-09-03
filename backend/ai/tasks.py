from agrimart.celery import app


@app.task(queue="ai", autoretry_for=(Exception,), retry_backoff=True, retry_jitter=True, max_retries=3)
def run_crop_scan_inference(scan_id: str) -> dict:
    return {"scan_id": scan_id, "status": "queued_for_model_integration"}

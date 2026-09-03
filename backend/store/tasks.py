from agrimart.celery import app


@app.task(queue="reconciliation")
def reconcile_payments() -> dict:
    return {"status": "placeholder", "mismatches": 0}

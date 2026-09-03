from io import BytesIO

from fastapi import HTTPException, UploadFile, status
from PIL import Image, UnidentifiedImageError

from realtime.config import get_settings

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp"}


async def validate_crop_image(file: UploadFile) -> bytes:
    settings = get_settings()
    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE, detail="Unsupported image type")

    content = await file.read(settings.max_upload_bytes + 1)
    if len(content) > settings.max_upload_bytes:
        raise HTTPException(status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, detail="Image is too large")

    try:
        with Image.open(BytesIO(content)) as image:
            image.verify()
            width, height = image.size
    except UnidentifiedImageError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid image payload") from exc

    if width * height > settings.max_image_pixels:
        raise HTTPException(status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, detail="Image dimensions are too large")

    return content

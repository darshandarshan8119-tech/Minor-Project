
from realtime.uploads import ALLOWED_IMAGE_TYPES


def test_allowed_image_types_are_narrow():
    assert ALLOWED_IMAGE_TYPES == {"image/jpeg", "image/png", "image/webp"}
    assert "image/svg+xml" not in ALLOWED_IMAGE_TYPES

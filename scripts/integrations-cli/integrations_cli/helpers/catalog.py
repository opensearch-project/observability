import json
import os
from functools import lru_cache

from returns.io import impure_safe

from . import constants, validate


@impure_safe
def _load_catalog_file() -> dict:
    catalog_path = os.path.join(constants.SCHEMA_ROOT, "observability/catalog.json")
    with open(catalog_path, "r", encoding="utf-8") as catalog_file:
        return json.load(catalog_file)


class CatalogManager:
    @lru_cache
    def __init__(self):
        catalog = _load_catalog_file().bind_result(validate.validate_catalog)
        # For now just re-throw exceptions on catalog load failure
        self.catalog = catalog.unwrap()._inner_value

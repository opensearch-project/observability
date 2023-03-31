import unittest
from copy import deepcopy

import jsonschema

import helpers.constants as constants
import helpers.validate as validate
from returns.pipeline import is_successful


class TestSchemas(unittest.TestCase):
    def test_config_schema_is_valid(self):
        config_schema = constants.SCHEMAS["integration.schema"]
        jsonschema.Draft6Validator.check_schema(config_schema)


class TestConfigValidations(unittest.TestCase):
    """Test validations pertaining to config objects"""

    def test_default_config_is_valid(self):
        config = deepcopy(constants.DEFAULT_CONFIG)
        assert is_successful(validate.validate_config(config))

    def test_default_with_no_name_is_invalid(self):
        config = deepcopy(constants.DEFAULT_CONFIG)
        del config["template-name"]
        assert not is_successful(validate.validate_config(config))

    def test_default_with_integer_description_is_invalid(self):
        config = deepcopy(constants.DEFAULT_CONFIG)
        config["description"] = 0
        assert not is_successful(validate.validate_config(config))

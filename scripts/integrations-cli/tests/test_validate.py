import unittest
from copy import deepcopy

import jsonschema

import helpers.constants as constants
import helpers.validate as validate


class TestSchemas(unittest.TestCase):
    def test_config_schema_is_valid(self):
        config_schema = constants.SCHEMAS["integration.schema"]
        jsonschema.Draft6Validator.check_schema(config_schema)


class TestDefaults(unittest.TestCase):
    def test_default_config_is_valid(self):
        config_schema = constants.SCHEMAS["integration.schema"]
        jsonschema.validate(constants.DEFAULT_CONFIG, config_schema)


class TestFailingValidations(unittest.TestCase):
    def test_default_with_no_name_is_invalid(self):
        config = deepcopy(constants.DEFAULT_CONFIG)
        del config["template-name"]
        with self.assertRaises(jsonschema.exceptions.ValidationError):
            validate.validate_config(config)

    def test_default_with_integer_description_is_invalid(self):
        config = deepcopy(constants.DEFAULT_CONFIG)
        config["description"] = 0
        with self.assertRaises(jsonschema.exceptions.ValidationError):
            validate.validate_config(config)

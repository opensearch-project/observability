# Integrations CLI

## Description

This is a CLI tool for creating, validating, and maintaining OpenSearch Dashboard Integrations.
The tool has three main functions:

- `create` a new integration with a specified configuration.
- `check` an integration for validity
- `package` an integration to be upload to an OpenSearch Integrations instance

## Installation

The project requires Python 3.7 or better.
As the project is not yet a full Python package, it must be installed manually.
To manually install, create a virtual environment and install the requirements.

On Unix:

```bash
$ python3 -m venv venv
$ source ./venv/bin/activate
$ pip install -r requirements.txt
```

On Windows:

```ps1
> python -m venv venv
> ./venv/Scripts/activate.ps1
> pip install -r requirements.txt
```

On Unix, the script `integ-cli` that will automatically install necessary dependencies.

```bash
$ ./integ-cli
```

## Usage

On unix, the CLI is callable with the included `integ-cli` script.

```bash
$ ./integ-cli
```

## Development

Running the tests:

```bash
$ python -m unittest
```

Formatting:

```bash
$ black .
```

## License

This project, like the rest of the OpenSearch projects, is licensed under the Apache 2.0 License.

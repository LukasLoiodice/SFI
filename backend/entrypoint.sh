#!/bin/bash
set -e

# Apply migration
alembic upgrade head

# Run app
exec "$@"
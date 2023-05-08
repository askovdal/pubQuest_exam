#!/usr/bin/env bash

# Exit on error
set -e

pwd
which node

cd api && gunicorn app:app

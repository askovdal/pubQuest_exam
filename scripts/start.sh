#!/usr/bin/env bash

# Exit on error
set -e

cd api || exit
gunicorn app:app

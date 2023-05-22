#!/usr/bin/env bash

# Exit on error
set -e

cd api || exit
gunicorn -w 4 -t 120 app:app

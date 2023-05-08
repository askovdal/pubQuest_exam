#!/usr/bin/env bash

# Exit on error
set -e

cd api || exit
pip install -r requirements.txt
cd ..

cd web || exit
npm i
npm run build
npm prune --production
cd ..

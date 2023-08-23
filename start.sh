#!/bin/bash

# Remove the build directory
rm -r build

echo "remove build"

# Run npm run build
npm run build

shopify theme dev --path=./build


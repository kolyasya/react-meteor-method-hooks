#!/bin/bash

# Script to prepare the package structure before npm publish

# Remove existing files and directories
rm -rf ./src

# Create a new directory structure
mkdir ./src
cp ./example/imports/ui/react-meteor-method-hooks/* ./src

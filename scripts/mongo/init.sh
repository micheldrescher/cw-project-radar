#!/bin/bash

echo "*************************"
echo "* INITIALISING DATABASE *"
echo "*************************"

# changing into the script's directory
cd "$(dirname "$0")"

# create the schema
mongo schema/schema.js
# create the sequence and the admin user
mongo schema/init.js
#!/bin/bash

echo "*******************"
echo "POPULATING DATABASE"
echo "*******************"

# changing into the script's directory
cd "$(dirname "$0")"

# create the schema
mongo schema/schema.js

#importing everything
mongoimport -d cw-project-radar -c users --file data/users.json
mongoimport -d cw-project-radar -c projects --file data/projects.json
mongoimport -d cw-project-radar -c classifications --file data/classifications.json
mongoimport -d cw-project-radar -c mtrlscores --file data/mtrlscores.json
mongoimport -d cw-project-radar -c radars --file data/radars.json
mongoimport -d cw-project-radar -c radardatas --file data/radardatas.json
mongoimport -d cw-project-radar -c radarrenderings --file data/radarrenderings.json
mongoimport -d cw-project-radar -c sequences --file data/sequences.json

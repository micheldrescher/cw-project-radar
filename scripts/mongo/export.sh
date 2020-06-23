#!/bin/bash

echo "*******************"
echo "EXPORTING DATABASE"
echo "*******************"

# changing into the script's directory
cd "$(dirname "$0")"

#export everything
mongoexport -d cw-project-radar --jsonArray --pretty -c users --file data/users.json
mongoexport -d cw-project-radar --jsonArray --pretty -c projects --file data/projects.json
mongoexport -d cw-project-radar --jsonArray --pretty -c classifications --file data/classifications.json
mongoexport -d cw-project-radar --jsonArray --pretty -c mtrlscores --file data/mtrlscores.json
mongoexport -d cw-project-radar --jsonArray --pretty -c radars --file data/radars.json
mongoexport -d cw-project-radar --jsonArray --pretty -c radardatas --file data/radardatas.json
mongoexport -d cw-project-radar --jsonArray --pretty -c radarrenderings --file data/radarrenderings.json
mongoexport -d cw-project-radar --jsonArray --pretty -c sequences --file data/sequences.json

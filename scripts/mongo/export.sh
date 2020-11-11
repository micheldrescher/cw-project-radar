#!/bin/bash

echo "*******************"
echo "EXPORTING DATABASE"
echo "*******************"

# changing into the script's directory
cd "$(dirname "$0")"

#export everything
mongoexport -d cw-project-radar --jsonArray --pretty -c users --out data/users.json
mongoexport -d cw-project-radar --jsonArray --pretty -c projects --out data/projects.json
mongoexport -d cw-project-radar --jsonArray --pretty -c classifications --out data/classifications.json
mongoexport -d cw-project-radar --jsonArray --pretty -c mtrlscores --out data/mtrlscores.json
mongoexport -d cw-project-radar --jsonArray --pretty -c radars --out data/radars.json
mongoexport -d cw-project-radar --jsonArray --pretty -c radarrenderings --out data/radarrenderings.json
mongoexport -d cw-project-radar --jsonArray --pretty -c sequences --out data/sequences.json

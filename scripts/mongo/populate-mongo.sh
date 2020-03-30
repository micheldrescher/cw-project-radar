echo "*******************"
echo "POPULATING DATABASE"
echo "*******************"
cd "$(dirname "$0")"

mongoimport --drop -d cw-project-radar -c users --file users.json
mongoimport --drop -d cw-project-radar -c projects --file projects.json
mongoimport --drop -d cw-project-radar -c classifications--file classifications.json
mongoimport --drop -d cw-project-radar -c mtrlscores --file mtrlscores.json
mongoimport --drop -d cw-project-radar -c radars --file radars.json
mongoimport --drop -d cw-project-radar -c radardatas --file radardatas.json
mongoimport --drop -d cw-project-radar -c radarrenderings --file radarrenderings.json
mongoimport --drop -d cw-project-radar -c sequences --file sequences.json

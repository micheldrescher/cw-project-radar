echo "*******************"
echo "POPULATING DATABASE"
echo "*******************"

pwd
echo $0
echo "$(dirname "$0")"
cd "$(dirname "$0")"

mongoimport -d cw-project-radar -c users --file users.json
mongoimport -d cw-project-radar -c projects --file projects.json
mongoimport -d cw-project-radar -c classifications --file classifications.json
mongoimport -d cw-project-radar -c mtrlscores --file mtrlscores.json
mongoimport -d cw-project-radar -c radars --file radars.json
mongoimport -d cw-project-radar -c radardatas --file radardatas.json
mongoimport -d cw-project-radar -c radarrenderings --file radarrenderings.json
mongoimport -d cw-project-radar -c sequences --file sequences.json

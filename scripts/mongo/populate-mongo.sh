echo "*******************"
echo "POPULATING DATABASE"
echo "*******************"
cd /docker-entrypoint-initdb.d

mongoimport -d cw-project-radar --file projects.json
mongoimport -d cw-project-radar --file classifications.json
mongoimport -d cw-project-radar --file mtrlscores.json
mongoimport -d cw-project-radar --file radars.json
mongoimport -d cw-project-radar --file radardatas.json
mongoimport -d cw-project-radar --file radarrenderings.json

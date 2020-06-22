!#/bin/bash
echo "*********************"
echo "INITIALISING DATABASE"
echo "*********************"
pwd
echo $0
echo "$(dirname "$0")"
cd "$(dirname "$0")"
pwd

mongo mongoDBInit.js_

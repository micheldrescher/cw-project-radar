echo "*********************"
echo "INITIALISING DATABASE"
echo "*********************"
cd "$(dirname "$0")"

mongo mongoDBInit.js_

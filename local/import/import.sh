#
# A helper script to automatically import bib and authorities

# Redirect stdout ( > ) into a named pipe ( >() ) running "tee"
#exec > >(tee -i logfile.txt)
#exec 2>&1

# set variables
export VUFIND_HOME=/usr/local/vufind >> /etc/profile.d/vufind.sh
export VUFIND_LOCAL_DIR=/usr/local/vufind/local >> /etc/profile.d/vufind.sh

# vufind base path
VUFIND_HOME=/usr/local/vufind

# fails on the first error
set -e

today="$(date +'%d%m%Y')"
printf "Record import started: %s\n" "$today"

# stop vufind 

echo "stopping vufind" 
su - www-admin -c '"$VUFIND_HOME"/solr.sh stop'
echo "vufind stopped" 

# remove all existing entries from the solr index
rm -rf "$VUFIND_HOME"/solr/vufind/biblio/index 
rm -rf "$VUFIND_HOME"/solr/vufind/biblio/spell*
rm -rf "$VUFIND_HOME"/solr/vufind/authority/index 
echo "deleted entries from existing solr index"


# wait for solr to start
su - www-admin -c '"$VUFIND_HOME"/solr.sh restart'
echo "restart solr index"

echo "import MARC records"
php "$VUFIND_HOME"/harvest/harvest_oai.php
"$VUFIND_HOME"/harvest/batch-delete.sh crl
"$VUFIND_HOME"/harvest/batch-import-marc.sh crl

# optimize index
php "$VUFIND_HOME"/util/optimize.php
echo "optimize index"

# create browse index
"$VUFIND_HOME"/index-alphabetic-browse.sh
echo "create browse index"

# remove caches
rm -R "$VUFIND_HOME"/local/cache/searchspecs/*
rm -R "$VUFIND_HOME"/local/cache/objects/*
echo "remove caches"

echo "finished"
echo "####################################"
exit 0 

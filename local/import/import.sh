#
# A helper script to automatically import bib and authorities

# Redirect stdout ( > ) into a named pipe ( >() ) running "tee"
#exec > >(tee -i logfile.txt)
#exec 2>&1

# set variables - these should already be declared!
#export VUFIND_HOME=/usr/local/vufind >> /etc/profile.d/vufind.sh
#export VUFIND_LOCAL_DIR=/usr/local/vufind/local >> /etc/profile.d/vufind.sh

# vufind base path
#VUFIND_HOME=/usr/local/vufind

# fails on the first error
set -e

today="$(date +'%d%m%Y')"
printf "Record import started: %s\n" "$today"

# stop vufind 
echo "\n\nStopping vufind (sudo password may be required)..." 
"$VUFIND_HOME"/solr.sh stop
echo "vufind stopped" 

# remove all existing entries from the solr index
echo "\n\nDeleting entries from existing solr index..."
rm -rf "$VUFIND_HOME"/solr/vufind/biblio/index 
rm -rf "$VUFIND_HOME"/solr/vufind/biblio/spell*
rm -rf "$VUFIND_HOME"/solr/vufind/authority/index 

# wait for solr to start
echo "\n\nRestarting solr index (sudo password may be required)..."
"$VUFIND_HOME"/solr.sh restart

echo "\n\nImporting MARC records..."
php "$VUFIND_HOME"/harvest/harvest_oai.php
"$VUFIND_HOME"/harvest/batch-delete.sh crl
"$VUFIND_HOME"/harvest/batch-import-marc.sh crl

# optimize index
echo "\n\nOptimizing index..."
php "$VUFIND_HOME"/util/optimize.php


# create browse index
echo "\n\nCreating browse index..."
"$VUFIND_HOME"/index-alphabetic-browse.sh

# remove caches
echo "\n\nRemoving caches..."
rm -R "$VUFIND_HOME"/local/cache/searchspecs/*
rm -R "$VUFIND_HOME"/local/cache/objects/*

echo "\n\nFinished"
echo "####################################"
exit 0 

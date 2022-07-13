#
# A helper script to automatically import bib and authorities

echo
echo
echo "This script will perform an incremental harvest from FOLIO without clearing any existing solr data."
echo
echo "IMPORTANT. In production this script should be run as the user who owns the codebase and the solr process (www-admin). Running this as any other user can case problems with file permissions or may lead to parts of the script failing."
echo
echo "You are currently acting as user: $USER"
echo
if [ $USER != 'www-admin' ]
  then
    read -r -p "Do you want to continue without switching to the www-admin user (this may only be safe in dev environments)? [y/N] " response
    if [[ "$response" =~ ^[yY][eE][sS]|[yY]$ ]]
    then
      echo
    else
      echo "Aborting"
      exit 0
    fi
fi

# Redirect stdout ( > ) into a named pipe ( >() ) running "tee"
#exec > >(tee -i logfile.txt)
#exec 2>&1

# set variables - these should already be set!
#export VUFIND_HOME=/usr/local/vufind >> /etc/profile.d/vufind.sh
#export VUFIND_LOCAL_DIR=/usr/local/vufind/local >> /etc/profile.d/vufind.sh

# vufind base path
#VUFIND_HOME=/usr/local/vufind

# fails on the first error
set -e

today="$(date +'%d%m%Y')"
printf "Record update started: %s\n" "$today"

echo
echo "Importing MARC records..."
php "$VUFIND_HOME"/harvest/harvest_oai.php
"$VUFIND_HOME"/harvest/batch-delete.sh crl
"$VUFIND_HOME"/harvest/batch-import-marc.sh crl

# optimize index
echo
echo "Optimizing index..."
php "$VUFIND_HOME"/util/optimize.php

# wait for solr to start
echo
echo "Restarting solr index..."
"$VUFIND_HOME"/solr.sh stop
"$VUFIND_HOME"/solr.sh restart

# create browse index
echo
echo "Creating browse index..."
"$VUFIND_HOME"/index-alphabetic-browse.sh

# remove caches
echo
echo "Removing caches..."
rm -R "$VUFIND_HOME"/local/cache/searchspecs/*
rm -R "$VUFIND_HOME"/local/cache/objects/*

echo
echo "Finished"
echo "####################################"
exit 0 

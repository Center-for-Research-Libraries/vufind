#
# A helper script to automatically import bib and authorities

echo
echo
echo "This script will perform an full harvest from FOLIO after CLEARING ALL SOLR data."
echo
echo "This will make all VuFind content disappear until the harvest is complete, which can take multiple days. This is DANGEROUS in a production environment."
echo
echo "Note also that the date in /local/harvest/crl/last_harvest.txt may also need to set to an appropriate harvest starting point. Only records updated after that date will be harvested."
echo
read -r -p "Are you sure you want to continue? [y/N] " response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]
then
  echo
else
  echo "Aborting"
  exit 0
fi
echo "IMPORTANT. In production this script should be run as the user who owns the codebase and the solr process (www-admin). Running this as any other user can case problems with file permissions or may lead to parts of the script failing."
echo
echo "You are currently acting as user: $USER"
echo
if [ $USER != 'www-admin' ]
  then
    read -r -p "Do you want to continue without switching to the www-admin user (this may only be safe in dev environments)? [y/N] " response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]
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
echo
echo "Stopping Solr index..." 
"$VUFIND_HOME"/solr.sh stop
echo "vufind stopped" 

# remove all existing entries from the solr index
echo
echo "Deleting entries from existing solr index..."
rm -rf "$VUFIND_HOME"/solr/vufind/biblio/index 
rm -rf "$VUFIND_HOME"/solr/vufind/biblio/spell*
rm -rf "$VUFIND_HOME"/solr/vufind/authority/index 

# wait for solr to start
echo
echo "Restarting solr index..."
"$VUFIND_HOME"/solr.sh restart

echo
echo "Importing MARC records..."
php "$VUFIND_HOME"/harvest/harvest_oai.php
"$VUFIND_HOME"/harvest/batch-delete.sh crl
"$VUFIND_HOME"/harvest/batch-import-marc.sh crl

# optimize index
echo
echo "Optimizing index..."
php "$VUFIND_HOME"/util/optimize.php


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

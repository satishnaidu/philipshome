#!/bin/sh

uname -a
ls -ltra

set -e -u -x

version=`cat ./version/number`

set +x

ls -lR
curl -o ./deploy-to-dev/noise-localizer-$version.war  -u $ARTIFACTORY_USER:$ARTIFACTORY_PW -X GET $ARTIFACTORY_URL/libs-snapshot-local/noise-localizer-$version-SNAPSHOT.war

echo "Succesfully downloaded artifactory"

ls -R ../*

set -x


current_app_name=noise-localizer-$version

sshpass -p $NP_SCP_PWD scp  -o StrictHostKeyChecking=no ./deploy-to-dev/noise-localizer-$version.war $NP_SCP_USER@spectra-ho-20p.sys.comcast.net:/home/sandey080/

echo "Copying success to target location"
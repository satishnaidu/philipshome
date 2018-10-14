#!/bin/sh

uname -a
ls -ltra

#pwd

#ls -ltra .m2

set -e -u -x

cd philipshome
#set -e -u +x
#echo mvn --version

ls -ltr ../node_modules

#mvn -Dmaven.repo.local="../.m2" clean install -Dmaven.test.skip=true
ln -sf node_modules ../node_modules
npm install

set -e -u -x

version=`cat ../version/number`

#ls -ltra target/*

#cp target/noise-localizer*.war ../artifactory-repository/noise-localizer-$version-SNAPSHOT.war

echo "build success"

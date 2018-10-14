#!/bin/sh

uname -a
ls -ltra

set -eux

git clone philipshome updated-philipshome

cd updated-philipshome

version=`cat ../version/number`

git tag philipshome-v$version.build

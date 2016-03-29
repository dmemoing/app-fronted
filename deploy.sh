#! /bin/bash
sudo rm -r $GOPATH/src/github.com/icsnju/apt-mesos/static
mkdir $GOPATH/src/github.com/icsnju/apt-mesos/static
cp -r ./app/fonts $GOPATH/src/github.com/icsnju/apt-mesos/static
cp -r ./app/images $GOPATH/src/github.com/icsnju/apt-mesos/static
cp ./app/index.html $GOPATH/src/github.com/icsnju/apt-mesos/static
cp -r ./app/scripts $GOPATH/src/github.com/icsnju/apt-mesos/static
cp -r ./app/css $GOPATH/src/github.com/icsnju/apt-mesos/static
cp -r ./app/js $GOPATH/src/github.com/icsnju/apt-mesos/static
cp -r ./app/lib $GOPATH/src/github.com/icsnju/apt-mesos/static

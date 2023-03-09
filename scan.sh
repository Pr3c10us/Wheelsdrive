#!/bin/bash

docker run --rm -p 9000:9000 -d --name $1 sonarqube

IP_ADDRESS=`docker inspect $1 | jq -r ".[] .NetworkSettings.Networks.bridge.IPAddress"`

sleep 100

sudo -i git clone $2

 sudo -i sonar-scanner -Dsonar.projectKey=Test_Project -Dsonar.sources=/root/$1 -Dsonar.host.url=http://127.0.0.1:9000  -Dsonar.login="admin" -Dsonar.password="admin"

sudo curl -u admin:admin -o $1.json http://localhost:9000/api/issues/search

docker rm -f $1

sudo -i rm -rf $1
#!/bin/bash

docker run --rm -p 9000:9000 -d --name $1 sonarqube

IP_ADDRESS=`docker inspect $1 | jq -r ".[] .NetworkSettings.Networks.bridge.IPAddress"`

sleep 100

sudo -i git clone $2

 sudo -i sonar-scanner -Dsonar.projectKey=Test_Project -Dsonar.sources=/root/$1 -Dsonar.host.url=http://127.0.0.1:9000  -Dsonar.login="admin" -Dsonar.password="admin"

sudo curl -u admin:admin -o $1.json http://localhost:9000/api/issues/search

docker rm -f $1

sudo -i rm -rf $1

aws s3 cp $1.json $3/$1.json

curl -X POST "$6?s3_bucket_name=$4&repo_name=$1&username=$5"

#  PR3C10US 5
# https://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@github.com/Pr3c10us/E-wallet.git 2
# E-wallet 1
# s3://wheelsdrive 3
# wheelsdrive 4
# http://54.226.89.89:3000/api/projects
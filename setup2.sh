#!/bin/bash

sudo mkdir /downloads/sonarqube -p
cd /downloads/sonarqube
sudo wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.2.0.1873-linux.zip
sudo unzip sonar-scanner-cli-4.2.0.1873-linux.zip
sudo mv sonar-scanner-4.2.0.1873-linux /opt/sonar-scanner
sudo chown ubuntu /opt/sonar-scanner/
sudo chgrp ubuntu /opt/sonar-scanner/
sudo chown ubuntu /opt/sonar-scanner/conf/sonar-scanner.properties
sudo chgrp ubuntu /opt/sonar-scanner/conf/sonar-scanner.properties
sudo chown ubuntu /etc/profile.d/
sudo chgrp ubuntu /etc/profile.d/
echo -e "sonar.host.url=http://127.0.0.1:9000/ \n  sonar.sourceEncoding=UTF-8 \n sonar.qualitygate.wait=true " >> /opt/sonar-scanner/conf/sonar-scanner.properties
echo -e "#/bin/bash \n export PATH='$PATH:/opt/sonar-scanner/bin'" >> /etc/profile.d/sonar-scanner.sh
source /etc/profile.d/sonar-scanner.sh
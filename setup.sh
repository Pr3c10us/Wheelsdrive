#!/bin/bash

sudo apt update -y

sudo apt install -y jq 
sudo apt install -y unzip

sudo apt install -y default-jre 
sudo apt install -y default-jdk 

# install node
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\
sudo apt-get install -y nodejs

sudo mkdir /downloads/sonarqube -p
cd /downloads/sonarqube
sudo wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.2.0.1873-linux.zip
sudo unzip sonar-scanner-cli-4.2.0.1873-linux.zip
sudo mv sonar-scanner-4.2.0.1873-linux /opt/sonar-scanner

cd /home/ubuntu

# install aws cli
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# install docker
sudo apt-get remove docker docker-engine docker.io containerd runc
sudo apt-get update
sudo apt-get -y install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
sudo mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER
newgrp docker

# run 
# chmod +x setup.sh
# . ./setup.sh

# sudo chown ubuntu /opt/sonar-scanner/
# sudo chgrp ubuntu /opt/sonar-scanner/
# sudo chown ubuntu /opt/sonar-scanner/conf/sonar-scanner.properties
# sudo chgrp ubuntu /opt/sonar-scanner/conf/sonar-scanner.properties
# sudo chown ubuntu /etc/profile.d/
# sudo chgrp ubuntu /etc/profile.d/
# sudo -i echo -e "sonar.host.url=http://127.0.0.1:9000/ \n  sonar.sourceEncoding=UTF-8 \n sonar.qualitygate.wait=true " >> /opt/sonar-scanner/conf/sonar-scanner.properties
# sudo -i echo -e "#/bin/bash \n export PATH='$PATH:/opt/sonar-scanner/bin'" >> /etc/profile.d/sonar-scanner.sh
# sudo -i source /etc/profile.d/sonar-scanner.sh
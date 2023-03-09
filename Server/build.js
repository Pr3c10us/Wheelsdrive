const { exec } = require('child_process');

exports.handler = async (event) => {
    // install
    await exec('yum -y update');
    await exec('yum -y install jq');
    await exec('yum -y install java-1.8.0-openjdk');

    // pre_build
    await exec('mkdir /downloads/sonarqube -p');
    await exec('cd /downloads/sonarqube');
    await exec(
        'wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.2.0.1873-linux.zip'
    );
    await exec('unzip sonar-scanner-cli-4.2.0.1873-linux.zip');
    await exec('mv sonar-scanner-4.2.0.1873-linux /opt/sonar-scanner');
    await exec(
        `echo -e "sonar.host.url=http://127.0.0.1:9000/ \n  sonar.sourceEncoding=UTF-8 \n sonar.qualitygate.wait=true " >> /opt/sonar-scanner/conf/sonar-scanner.properties`
    );
    await exec(
        `echo -e "#/bin/bash \n export PATH='$PATH:/opt/sonar-scanner/bin'" >> /etc/profile.d/sonar-scanner.sh`
    );
    await exec('source /etc/profile.d/sonar-scanner.sh');
    await exec('sonar-scanner -v');

    // build
    await exec(
        'docker run --rm -p 9000:9000 -d --name sonarserver public.ecr.aws/i3o0y1a9/sonarqube'
    );
    await exec(
        'IP_ADDRESS=`docker inspect sonarserver | jq -r ".[] .NetworkSettings.Networks.bridge.IPAddress"`'
    );
    await exec('sleep 100');
    await exec(`git clone ${process.env.CLONE_URL}`);
    await exec(`cd ${process.env.REPO_NAME}`);
    await exec(
        `sonar-scanner -Dsonar.projectKey=Test_Project -Dsonar.sources=. -Dsonar.host.url=http://127.0.0.1:9000  -Dsonar.login="admin" -Dsonar.password="admin"`
    );
    await exec(
        `curl -u admin:admin -o ${process.env.REPO_NAME}.json http://44.195.37.197:9000/api/issues/search`
    );

    // post_build
    console.log('Uploading JSON file as artifact');
    await exec(
        `aws s3 cp ${process.env.REPO_NAME}.json ${process.env.S3_URL}/${process.env.REPO_NAME}.json`
    );
    // post_build (continued)
    await exec(
        `curl -X POST "${process.env.UPDATE_POJRCT_URL}?s3_bucket_name=${process.env.S3_BUCKET_NAME}&repo_name=${process.env.REPO_NAME}&username=${process.env.USERNAME}"`
    );

    return { message: 'Build complete' };
};

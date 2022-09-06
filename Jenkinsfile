pipeline {
    agent any
    stages {
        stage('source') {
            steps {
                git 'https://github.com/Amanjot726/Phatak-Status-App-Admin'

                sh 'npm install'

                echo 'Source code is ready and Dependencies are installed'
            }
        }
        stage('Test') {
            steps {
                //sh(script: 'node_modules/.bin/cypress run || true')         // This is the command to run cypress tests and if cypress is not installed then it will skip it by (|| true)
                 sh "npm run cypress:run"
            }
        }
        stage('build') {
            steps {
                sh 'npm run build'
                sh 'ng build'
                echo 'Build is ready'
            }
        }
        // stage('deploy') {
        //     steps {
        //         sh 'npm run deploy'
        //         echo 'Deployed'
        //     }
        // }
    }
}

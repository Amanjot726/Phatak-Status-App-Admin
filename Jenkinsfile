pipeline {
    agent any
    stages {
        stage('Source') {
            steps {
                git 'https://github.com/Amanjot726/Phatak-Status-App-Admin'

                bat 'npm install'

                echo 'Source code is ready and Dependencies are installed'
            }
        }
        stage('Test') {
            steps {
                //sh(script: 'node_modules/.bin/cypress run || true')         // This is the command to run cypress tests and if cypress is not installed then it will skip it by (|| true)
                 bat "npm run cy:run"
            }
        }
        stage('build') {
            steps {
                bat 'npm run build'
                // sh 'ng build'
                echo 'Build is ready'
            }
        }
        stage('deploy') {
            environment{
              auth_credentials = credentials('auth_credentials')
            }
            steps {
                bat 'ng build --configuration production'
                bat 'firebase deploy --non-interactive --token ${auth_credentials} --only hosting'
                echo 'Deployed'
            }
        }
    }
}

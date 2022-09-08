pipeline {
    agent any
    environment{
      auth_credentials = credentials('auth_credentials')
    }
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
                 echo 'All tests are passed successfully'
            }
        }
        stage('Build') {
            steps {
                // bat 'npm run build'
                bat 'ng build --configuration production'
                echo 'Build is ready'
            }
        }
        stage('Deploy') {
            steps {
                bat "firebase deploy --non-interactive --token ${auth_credentials} --only hosting"
                echo 'Deployed'
            }
        }
    }
}

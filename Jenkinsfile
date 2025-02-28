pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout your Git repository
                script {
                    // Replace 'your-repo-url' with your actual Git repository URL
                    checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/RaghuCPatel/Elumina.git']]])
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js and npm
                sh 'curl -sL https://deb.nodesource.com/setup_18.x | bash -'
                sh 'apt-get install -y nodejs'

                // Install project dependencies
                sh 'npm install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Run Playwright tests
                sh 'npx cross-env ENV=sandbox  HEADLESS_MODE=true npm run test:single' // Replace with your actual test script
            }
        }
    }

    post {
        success {
            // Perform actions on successful build
        }
        failure {
            // Perform actions on build failure
        }
    }
}

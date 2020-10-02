pipeline{
   agent {
    node {
      label 'nodejs'
    }
  }
  stages{
    stage ('Checkout codigo fuente'){
      steps{
        checkout scm
      }
    }
    stage ('Instalar dependencias'){
      steps{
        sh '''
          npm install --verbose -d          
        '''
      }
    }
    stage ('Inspección con Sonarqube'){
      steps{
        sh '''
          npm run sonar          
        '''
      }
    }
    stage ('Desplegar') { 
      steps{
        script {
          openshift.withCluster() {
            openshift.withProject('teom') {
              openshift.selector("bc", "nodejs-teom").startBuild("--from-dir=./dist", "--wait=true", "--follow", "--loglevel=8")
            }
          }
        }
      }
    }
  }
}
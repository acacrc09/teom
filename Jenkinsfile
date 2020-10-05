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
          npm install n --save-dev
          npm install --verbose -d          
          npm run n          
        '''
      }
    }
    stage ('Pruebas unitarias'){
      steps{
        sh '''
          npm run unit          
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
              openshift.selector("bc", "nodejs-teom").startBuild("--from-dir=./", "--wait=true", "--follow", "--loglevel=8")
            }
          }
        }
      }
    }
    stage ('Probar API con Newman') { 
      steps{
        sh '''
          npm run newman          
        '''
      }
    }
    stage ('Probar WEB con Selenium') { 
      steps{
        sh '''
          npm run selenium          
        '''
      }
    }
  }
}
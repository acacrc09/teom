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
    stage ('Revisión calidad con LINT'){
      steps{
        sh '$(npm bin)/ng lint'
      }
    }
    stage ('Construcción Aplicación') {
      steps{
        sh '$(npm bin)/ng build --prod --build-optimizer'
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
FROM registry.redhat.io/redhat-openjdk-18/openjdk18-openshift

USER root
COPY certs/*.pem /etc/pki/ca-trust/source/anchors/
RUN update-ca-trust

USER 185

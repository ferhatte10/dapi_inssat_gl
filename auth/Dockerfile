FROM quay.io/keycloak/keycloak:latest

# Enable health and metrics supportuilder
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

ENV KC_HOSTNAME_STRICT_HTTPS=false
ENV KC_HOSTNAME_STRICT=false
ENV PROXY_ADDRESS_FORWARDING=true
ENV KC_HOSTNAME_STRICT_BACKCHANNEL=true
ENV KC_PROXY=edge
#ENV KC_HTTP_RELATIVE_PATH=/auth
#ENV KC_HOSTNAME=

RUN /opt/keycloak/bin/kc.sh build --db mariadb --transaction-xa-enabled=false

ENV KC_DB=mariadb
ENV KC_DB_PASSWORD=FpTzQzhw3Qy2FV2E0Ch1
ENV KC_DB_URL=jdbc:mariadb://mariadb:3306/intranet_auth
ENV KC_DB_USERNAME=root
ENV KC_TRANSACTION_XA_ENABLED=false

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]

#Ay8hndi4XcN0qO5V3QGm authUser
#kc.sh show-config
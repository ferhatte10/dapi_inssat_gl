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

RUN /opt/keycloak/bin/kc.sh build --db postgres --transaction-xa-enabled=false

ENV KC_DB=postgres
ENV KC_DB_USERNAME=appservices
ENV KC_DB_PASSWORD=4gv!stWsevk8@hcgs51454fh
ENV KC_DB_URL=jdbc:postgresql://db:5432/intranet_auth
ENV KC_TRANSACTION_XA_ENABLED=false

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
FROM quay.io/keycloak/keycloak:22.0.5

# Enable health and metrics supportuilder
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

ENV KC_HOSTNAME_STRICT_HTTPS=false
ENV KC_HOSTNAME_STRICT=false
ENV PROXY_ADDRESS_FORWARDING=true
ENV KC_HOSTNAME_STRICT_BACKCHANNEL=true
ENV KC_PROXY=edge

RUN /opt/keycloak/bin/kc.sh build --db mariadb --transaction-xa-enabled=false

ENV KC_DB=mariadb
ENV KC_DB_PASSWORD=4mvstWAvkShcgsOMG5fh
ENV KC_DB_URL=jdbc:mariadb://db:3306/intranet_auth
ENV KC_DB_USERNAME=root
ENV KC_TRANSACTION_XA_ENABLED=false

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
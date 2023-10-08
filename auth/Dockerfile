FROM quay.io/keycloak/keycloak:latest

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true


ENV KC_HOSTNAME_STRICT_HTTPS=false
ENV KC_HOSTNAME_STRICT=false
ENV PROXY_ADDRESS_FORWARDING=true
ENV KC_HOSTNAME_STRICT_BACKCHANNEL=true
ENV KC_PROXY=edge
# ENV KC_HOSTNAME_PATH=/auth

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]


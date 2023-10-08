docker rm -f dapiauth && docker run --name dapiauth -dp 8080:8080 \
        -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin \
        dapiauth \
        start --optimized
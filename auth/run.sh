docker rm -f dapiauth && docker run --name dapiauth --restart always -dp 8080:8080 dapiauth  start --optimized
#-e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin
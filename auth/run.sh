docker rm -f dapiauth && docker run --name dapiauth --restart always -dp 5009:5009 dapiauth  start --optimized
#-e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin
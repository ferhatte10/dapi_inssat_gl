const KeycloakService = require("./auth.keycloak");

const keycloakInstance = new KeycloakService();
keycloakInstance.initKeycloak();

exports.setupKeycloak = (app) => {
    app.use(keycloakInstance.getKeycloak().middleware());
    return keycloakInstance;
}
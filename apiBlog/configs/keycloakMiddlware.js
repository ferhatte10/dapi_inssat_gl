const {initKeycloak} = require("./auth.keycloak");

const keycloakInstance = initKeycloak();

exports.setupKeycloak = (app) => {
    app.use(keycloakInstance.middleware());
    return keycloakInstance;
}
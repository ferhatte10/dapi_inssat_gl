const Keycloak = require('keycloak-connect');
class KeycloakManager {
    constructor() {
        this._keycloak = null;
    }

    initKeycloak() {
        if (this._keycloak) {
            console.warn("Trying to init Keycloak again!");
        } else {
            console.info("Initializing Keycloak...");
            this._keycloak = new Keycloak({});
        }
    }

    getKeycloak() {
        if (!this._keycloak) {
            console.warn('Keycloak has not been initialized. \n Init ...');
            this.initKeycloak();
        }
        return this._keycloak;
    }
}

module.exports = KeycloakManager;
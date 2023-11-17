let Keycloak = require('keycloak-connect')

let _keycloak

function initKeycloak() {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak
    }
    else {
        console.info("Initializing Keycloak...");
        _keycloak = new Keycloak({});
        return _keycloak
    }
}

function getKeycloak() {
    if (!_keycloak){
        console.warn('Keycloak has not been initialized. \n Init ...');
        initKeycloak()
    }
    return _keycloak
}



module.exports = {
    initKeycloak,
    getKeycloak,
}
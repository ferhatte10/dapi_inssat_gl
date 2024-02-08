module.exports = {
    paths: {
        '/users': {
            ...require('./users/getUsers'),
        },
        '/users/{id}': {
            ...require('./users/getUserById'),
        },
        '/users/{id}/suivi': {
            ...require('./users/getUserSuivi'),
        }
    }
}
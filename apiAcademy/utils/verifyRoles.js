
module.exports.verifyRoles = (req, res, next, rules)=>{
    let userRoles = req.claims?.realm_access?.roles;
    let hasRole = false;
    // Check if the user has one of the roles in the rules array
    if (userRoles) {
        hasRole = rules.some(role => userRoles.includes(role));
    }

    if (hasRole || userRoles.includes('admin')) {
        next();
    } else {
        res.status(403).json({message: 'You do not have access to this resource.'});
    }
}
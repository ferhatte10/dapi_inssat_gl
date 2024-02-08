
module.exports.verifyRoles = (req, res, next, rules)=>{
    let userRoles = req.claims?.realm_access?.roles;
    let hasRole = false;
    // Check if the user has the required role and if he hasn't have all the required roles set hasRole to false
    for (let i = 0; i < rules.length; i++) {
        if (userRoles.includes(rules[i])) {
            hasRole = true;
        } else {
            hasRole = false;
            break;
        }
    }
    if (hasRole || userRoles.includes('admin')) {
        next();
    } else {
        res.status(403).json({message: 'You do not have access to this resource.'});
    }
}
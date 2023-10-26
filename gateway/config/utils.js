exports.getRouteFormatted = (req,ROUTES)=>{
    let routeFormatted = {}
    ROUTES.forEach((route)=>{
        routeFormatted[route.url.replace(/\//g, "")
        ] = `${req.protocol}://${req.get('host')}${route.url}`
    })
    return routeFormatted
}
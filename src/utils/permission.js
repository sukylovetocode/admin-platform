export function generateRoutes(asyncRoutes, accessRoutes) {
    let combineRoutes = [];
    asyncRoutes.forEach((route) => {
        let tmp = { ...route };
        if (hasPermission(accessRoutes, route)) {
            if (tmp.children) {
                tmp.children = generateRoutes(tmp.children, accessRoutes);
            }
            combineRoutes.push(tmp);
        } else if (!tmp.component) {
            combineRoutes.push(tmp);
        }
    });
    return combineRoutes;
}

function hasPermission(accessRoutes, route) {
    if (accessRoutes.some((item) => item === route.path)) {
        return true;
    } else {
        return false;
    }
}

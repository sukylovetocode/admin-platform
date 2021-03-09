import _import from '@/router/modules/router_map';

/**
 *
 * @param {Array} accessRoutes 后端获取到的路由
 * @returns
 */
export function generateRoutes(accessRoutes) {
    // 借助引用赋值来进行树形递归
    var map = {};
    var treeData = [];
    accessRoutes.forEach(function(item) {
        // 放置插件
        map[item.id] = item;
        map[item.id]['component'] = _import(item['component']);
    });
    accessRoutes.forEach(function(item) {
        var parent = map[item.pid];
        if (parent) {
            if (parent.children) {
                parent.children.push(item);
            } else {
                parent.children = [];
                parent.children.push(item);
            }
        } else {
            treeData.push(item);
        }
    });
    return treeData;
}

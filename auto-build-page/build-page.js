//https://cloud.tencent.com/developer/article/1612635
var addConfig = require('./addConfig');
var fs = require('fs');
var path = require('path');
var shell = require('shelljs');

shell.echo('>>>>>>');
shell.echo('开始新建页面');
addConfig.forEach((ele) => {
    if (ele.open) {
        buildPage(ele);
    }
});

function handleStr(str, config) {
    if (config.helloworld) {
        return str;
    }
    str = str.replace('%title%', config.desc);
    str = str.replace('%method%', config.getlist.method);
    str = str.replace('%geturl%', config.getlist.url);
    return str;
}

function buildPage(config) {
    var paths = path.resolve(`./src/views/${config.name}`);
    shell.echo('页面地址:' + paths);
    if (fs.existsSync(paths)) {
        shell.echo('目录已存在');
        return;
    }
    // 同步生成文件夹
    fs.mkdirSync(paths);
    shell.echo('目录生成');
    var str = '';
    if (config.helloworld) {
        fs.readFile(
            path.resolve('./auto-build-page/template-helloworld.vue'),
            'utf-8',
            (err, data) => {
                if (err) {
                    throw err;
                }
                // 新建空白页，读取空白页模版
                str = handleStr(data, config);
                // 写入文件
                shell.echo('复制文件……');
                fs.writeFileSync(paths + '/index.vue', str, 'utf-8', (err) => {
                    throw err;
                });
                shell.echo('开始新增路由……');
                addRou(`@/views/${config.name}/index.vue`, config);
            }
        );
    } else {
        str = handleStr(
            fs.readFile(path.resolve('./template-table.vue')),
            config
        );
    }
}

function addRou(paths, config) {
    fs.readFile(
        path.resolve('./auto-build-page/template-route.txt'),
        'utf-8',
        (err, data) => {
            if (err) {
                throw err;
            }
            var templateStr = handleRouStr(data, config, paths);
            // 添加到路由文件
            addToConf(templateStr);
        }
    );
}
function handleRouStr(str, config, paths) {
    str = str.replace(/%path%/g, `/${config.name}`);
    str = str.replace(/%name%/g, config.desc);
    str = str.replace(/%name2%/g, `${config.desc}首页`);
    str = str.replace(/%repath%/g, `/${config.name}/index`);
    str = str.replace(/%requirepath%/g, paths);
    return str;
}

function addToConf(str) {
    str += '// add-flag'; // 添加的位置标记
    fs.readFile(
        path.resolve('./auto-build-page/addRoute.js'),
        'utf-8',
        (err, data) => {
            if (err) {
                throw err;
            }
            var confStr = handleConfRouStr(data, str);
            fs.writeFileSync(
                path.resolve('./auto-build-page/addRoute.js'),
                confStr,
                'utf-8',
                (err) => {
                    throw err;
                }
            );
            shell.echo('路由添加成功!');
            shell.echo('结束生成页面');
            shell.echo('>>>>>>');
        }
    );
}
function handleConfRouStr(ori, str) {
    ori = ori.replace('// add-flag', str);
    return ori;
}

# admin-platform

后台管理系统目标

[x] 权限管理
[x] 动态渲染菜单
[x] 全局颜色更换
[x] 支持国际化
[x] 富文本编辑/MD 写法切换
[x] 渲染表格以及能够导入及导出 Excel 表格
[x] 第三方登录
[X] 复制粘贴功能
[X] 全屏展示
[x] 支持动画导入
[x] 进行 Axios 封装
[x] 按需引入 Element-ui
[x] 图片懒加载
[X] 日程表
[X] 可视化编辑器
[x] 组合图表展示
[x] 三维物体更换颜色
[x] 聊天 demo
[x] 表格封装
[x] 支持 scss

### HOC 与 mixin

### ehart 按需引入

### 分析 build 性能

`npm i webpack-bundle-analyzer`

```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin

configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()],
},
```

### 支持 scss

报错太多，概括一下就是各个版本冲突来冲突去
VUE-CLI4.5.0 如何安装我们的 scss
`npm install style-resources-loader vue-cli-plugin-style-resources-loader`
`npm install node-sass@4.0.0 sass-loader@7.3.1`
`npm install webpack@4.5.0`
vue-cli 现在只用的 webpack@4 的版本 别盲目升级

### 三维物体更换颜色

值得注意如果需要我们自己来换布料，则需要我们把模型在`blender`中进行导出，且要适应材质的话，需要模型拥有`UV贴图`，导出格式为`glb`

### 表格封装(应该封装成插件)

-   传入值

```javascript
tableHeader: [
    {
        name: 'id',
        label: 'ID',
    },
];
```

-   传入的数据数组中对象需要`key`与`tableHeader`中的`name`一致

```javascript
tableData: [
    {
        id: 1,
    },
];
```

#### 支持功能

-   可以直接传入数据后进行静态数据的渲染
-   可以根据需要通过插槽改写每一个插槽的内容
-   初始化给予了三个操作按钮，分别是 编辑 删除以及发布，同样可以根据需要直接删除
-   可以选择是否需要单选框
-   本身带有事件接口是`handleEdit` `handleDelete` `handlePublished` `handleMultiSelect` 可根据需要进行取值

`Loading chunk {n} failed`
我们引入的组件有路径不对的,要一个个路径重新检查

### 可视化编辑器

-   不使用 VUE-Draggable
    因为本身其封装是用来排序的，针对我们的可视化编辑器的移动我认为是略微有些碍事，因此选择自己封装

### 如何自动生成页面（某个文件夹下面的页面能够自动给我们加载）

### 日程表

##### 需求分析

-   能够切换周视图以及月视图
-   能够点击某一日进行日程显示以及日程填写
-   识别我们的法定节假日
-   在月视图中会显示最近一周的行程
-   在周视图中会显示当天的行程

##### 制作要点

-   知道当前日期，根据当前日期计算出 7 \* 6 的方格内日子是多少
-   多日行程连接，通过检测当前日期是否是当天，是就添加起始以及结束类，否则可以直接全部覆盖

### 权限管理

#### 路由格式设计

vue-element-admin 做法 我的做法 有什么问题 addRoutes 刷新页面无效显示 404
vue-element-admin 中是使用前端角色验证来进行路由权限管理，对于路由变化不大或者基本不会有新增路由的情况是可以的，但是我们知道我们很多项目其实都会涉及到权限管理这个功能，对于经常要增添功能的话使用角色验证就需要前端路由维护+后端权限维护两件事，而且如果要修改一下菜单的逻辑就更加麻烦了，因此在我的项目中，我的动态路由都是我根据后端返回的数据进行渲染。

### 按需引入 Element-ui

element-ui 说到的的那个`babel-preset-es2015`有 BUG，已经完全不支持现在的`babel7`系列了，那我们现在要按需加载就要

##### 下载 babel-plugin-component & @babel/preset-env

`npm install babel-plugin-component @babel/preset-env -D`

##### 配置 babelrc 或者 babel.config.js

```json
{
    "presets": [["@babel/preset-env", { "modules": false }]],
    "plugins": [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ]
    ]
}
```

##### 引入按需加载组件

```javascript
// 按需注册Element-ui 不需另外注册事件
import Vue from 'vue';
import { Container } from 'element-ui';

Vue.use(Container);
```

### 环境变量储存

https://cli.vuejs.org/zh/guide/mode-and-env.html#%E7%A4%BA%E4%BE%8B%EF%BC%9Astaging-%E6%A8%A1%E5%BC%8F

值得注意的是，只有我们定义的带`VUE_APP_`开头的变量才能被 vue-cli 正确读取

### 富文本编辑

富文本实现原理：

-   textarea 上定位各种样式 document.execCommand(问题：换行处理、键盘事件、指令行为不一致)
-   实现自己的布局引擎 （slate 中通过一个虚拟 DOM 交互构建一个 model，能随意植入插件，immutable 不可变状态）
-   使用浏览器的 ContentEditable（会破坏我们的数据结构，自动插入垃圾标签）

本来想用 slate.js 进行开发的，但是看了下作者现阶段并没有意愿去维护 VUE 版本的，只有一个别人写的 VUE 库，要使用可能要自己根据 slate-react 进行构建，所以最后还是选择了老牌的 tinymce. 关于 slate.js 的介绍可以参考[这个文章](https://juejin.cn/post/6844903504478208007)

#### 希望我们富文本能够实现的功能

-   能够上传图片 支持传 URL 和直接传到我们服务器中
-   能够加粗以及斜体
-   能够渲染代码块
-   撤销/后退功能
-   设置字体大小以及样式
-   渲染表格
-   能够使用荧光笔
-   能够传视频

### 渲染表格以及能够导入及导出 Excel 表格

说到表格我们无法避过一个强大的库: js-xlsx，就是这个强大的库让我们在浏览器中能够简单的进行表格的引入以及导出.先说下简单的 API 使用方法

```javascript
// 创建工作簿
const workbook = Xlsx.utils.book_new();
// 二维数组转换成工作表对象
// const worksheet = Xlsx.utils.aoa_to_sheet(data);
// 对象换成工作表
const worksheet = Xlsx.utils.json_to_sheet(data);
// 将工作表添加到工作簿中
Xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);
// 工作簿导出
Xlsx.writeFile(workbook, filename);

// 表格读取
let reader = new FileReader();
reader.onload = function(e) {
    let data = e.target.result;
    //以二进制方法读取
    let wb = Xlsx.read(data, {
        type: 'binary',
    });
    // 将单元格内容转化成json
    JSON.stringify(Xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
};
reader.readAsBinaryString(file);
```

### 使用 prettier 格式化我们文件

下载 prettier
`npm install --save-dev --save-exact prettier`

配置 json 文件
详情配置到 prettier 进行查看

```json
{
    "trailingComma": "es5",
    "tabWidth": 4, // 开始键
    "semi": true, // 要不要分号
    "bracketSpacing": true,
    "arrowParens": "always",
    "singleQuote": true
}
```

### 支持国际化

`npm install vue-i18n`

```javascript
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'CN',
    messages: {
        CN: require('@/locale/zh_CN'),
        EN: require('@/locale/en_US'),
    },
});

new Vue({
    router,
    store,
    i18n, // 需要引入
    render: (h) => h(App),
}).$mount('#app');
```

```javascript
module.exports = {
    login: {
        // our data
    },
};
```

### 图片懒加载

-   计算元素的高度监听器遍历加载
    检测图片是否在视口中
-   Intersection Observer API 兼容性值得考究

难点: 图片是否已经插入 DOM 中，如果未插入高度为 0，无法监听图片位置

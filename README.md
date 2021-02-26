# admin-platform

后台管理系统目标

[ ] 权限管理
[ ] 动态渲染菜单
[ ] 全局颜色更换
[ ] 支持国际化
[ ] 富文本编辑/MD 写法切换
[ ] 渲染表格以及能够导入及导出 Excel 表格
[ ] 第三方登录
[ ] 图表渲染 echart /g2
[ ] 分步表单提交
[ ] 复制粘贴功能
[ ] 全屏展示
[ ] 能够调用电脑摄像头进行人脸注册及识别
[ ] 支持动画导入
[ ] 邮箱订阅功能

### 富文本编辑

富文本实现原理：

-   textarea 上定位各种样式
-   实现自己的布局引擎
-   使用浏览器的 ContentEditable（会破坏我们的数据结构，自动插入垃圾标签）

本来想用 slate.js 进行开发的，但是看了下作者现阶段并没有意愿去维护 VUE 版本的，只有一个别人写的 VUE 库，所以最后还是选择了老牌的 tinymce. 关于 slate.js 的介绍可以参考[这个文章](https://juejin.cn/post/6844903504478208007)

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

//定义组件库中显示的所有组件
export default [
    {
        id: 1,
        title: '图片',
        icon: 'el-icon-picture-outline',
        component: 'Picture',
        init: {
            propImg: require('@/assets/logo.png'),
            style: {
                width: 375,
                height: 100,
                left: 0,
                top: 0,
                zIndex: 1,
            },
        },
    },
    {
        id: 2,
        title: '文字',
        icon: 'el-icon-edit',
        component: 'DText',
        init: {
            propVal: '这里有段文本',
            style: {
                width: 100,
                height: 30,
                left: 0,
                top: 0,
                zIndex: 1,
            },
        },
    },
];

<template>
    <div>
        <el-row><tools></tools></el-row>
        <el-row>
            <el-col :span="5">
                <h4>组件库</h4>
                <div
                    v-for="item in componentsList"
                    :key="item.id"
                    class="component_btn"
                    @click="handleAddComponent(item.component)"
                >
                    <i :class="item.icon"></i>{{ item.title }}
                </div>
            </el-col>
            <el-col :span="14"
                ><drawer :data="pageData" @active_item="handleActive"></drawer
            ></el-col>
            <el-col :span="5"
                ><h4>属性区域</h4>
                <attr :item="active"></attr
            ></el-col>
        </el-row>
    </div>
</template>

<script>
import Tools from './Tools/index';
import Drawer from './drawer/index';
import Attr from './attr/index';
import componentsList from './componentsList';
export default {
    data() {
        return {
            componentsList,
            pageData: [
                {
                    id: 1,
                    name: 'DText',
                    propVal: '文本', // 初始化的值
                    style: {
                        width: 100,
                        height: 30,
                        textAlign: 'center', // 文本排列方式 center left right
                        left: 100, // x轴位置
                        top: 100, // y轴位置
                        zIndex: 1, // 层级
                    },
                },
            ],
            active: null,
        };
    },
    components: {
        Tools,
        Drawer,
        Attr,
    },
    methods: {
        handleAddComponent(component) {
            console.log(component);
        },
        handleActive(item) {
            this.active = item;
        },
    },
};
</script>

<style lang="css">
.component_btn {
    border: 1px solid #ebebeb;
    display: inline-block;
    padding: 20px;
    margin: 10px;
    cursor: pointer;
}
</style>

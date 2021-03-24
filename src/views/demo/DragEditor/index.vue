<template>
    <div>
        <el-row><tools></tools></el-row>
        <el-row>
            <el-col :span="5">
                <comp></comp>
            </el-col>
            <el-col :span="14"
                ><drawer :data="pageData" @active_item="handleActive"></drawer
            ></el-col>
            <el-col :span="5"> <attr :item="active_item"></attr></el-col>
        </el-row>
    </div>
</template>

<script>
// NOTE: 启发 https://juejin.cn/post/6908502083075325959
// NOTE: 启发 https://juejin.cn/post/6844903992426758152
import Tools from './Tools/index';
import Drawer from './drawer/index';
import Attr from './attr/index';
import Comp from './comp/index';
import cloneDeep from 'lodash/cloneDeep';

export default {
    components: {
        Tools,
        Drawer,
        Attr,
        Comp,
    },
    computed: {
        pageData() {
            return cloneDeep(this.$store.state.editor.pageData);
        },
        active_item() {
            return this.$store.state.editor.pageData[
                this.$store.state.editor.active_item
            ];
        },
    },
    methods: {
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

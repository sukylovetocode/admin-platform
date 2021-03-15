<template>
    <div>
        <el-row><span>工具栏</span><tools></tools></el-row>
        <el-row>
            <el-col :span="5">
                <h4>组件库</h4>
                <component
                    :is="item.component"
                    v-for="item in ComponentsList"
                    :key="item.id"
                ></component>
            </el-col>
            <el-col :span="14">画布</el-col>
            <el-col :span="5">属性区域</el-col>
        </el-row>
    </div>
</template>

<script>
import Components from './components/install';
import Tools from './Tools/index';
import Vue from 'vue';
Vue.use(Components);
import componentsList from './componentsList';
export default {
    data() {
        this.ComponentsList = componentsList[0].children;
        return {};
    },
    components: {
        Tools,
    },
};
</script>

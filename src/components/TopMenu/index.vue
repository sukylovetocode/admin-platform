<template>
    <div class="top-menu">
        <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            @select="handleSelect"
        >
            <el-menu-item index="1">常用功能</el-menu-item>
            <el-submenu index="2">
                <template slot="title">图表</template>
                <el-menu-item index="2-1">echarts</el-menu-item>
                <el-menu-item index="2-2">G2</el-menu-item>
                <el-menu-item index="2-3">three.js</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">demo</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: '1',
        };
    },
    methods: {
        handleSelect(e) {
            console.log(e);
        },
    },
};
</script>

<style lang="css">
.el-menu {
    border-bottom: none !important;
}
</style>

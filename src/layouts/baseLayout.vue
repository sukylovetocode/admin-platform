<template>
    <el-container>
        <el-aside width="250px"><side-menu></side-menu></el-aside>
        <el-container>
            <el-header><my-header></my-header></el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer><my-footer></my-footer></el-footer>
        </el-container>
        <!-- <drawer @my_set="handleSet"></drawer> -->
    </el-container>
</template>

<script>
import MyFooter from '@/components/Footer/index';
import MyHeader from '@/components/Header/index';
import SideMenu from '@/components/Menu/SideMenu';
// import Drawer from '@/components/Drawer/index.vue';
export default {
    components: {
        MyFooter,
        MyHeader,
        SideMenu,
        // Drawer,
    },
    methods: {
        // handleSet(data) {
        //     console.log(data);
        // },
    },
};
</script>

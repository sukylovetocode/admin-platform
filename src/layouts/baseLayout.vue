<template>
    <el-container>
        <el-aside width="250px"><my-menu></my-menu></el-aside>
        <el-container>
            <el-header><my-header></my-header></el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer><my-footer></my-footer></el-footer>
        </el-container>
    </el-container>
</template>

<script>
import MyFooter from '@/components/Footer/index';
import MyHeader from '@/components/Header/index';
import MyMenu from '@/components/Menu/index';
export default {
    components: {
        MyFooter,
        MyHeader,
        MyMenu,
    },
};
</script>

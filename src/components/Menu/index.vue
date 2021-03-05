<template>
    <div class="my-menu">
        <h3 class="my-menu-admin">简单后台</h3>
        <el-menu
            default-active="2"
            class="my_menu_left"
            @open="handleOpen"
            @close="handleClose"
            @select="handleSelect"
        >
            <menu-item
                v-for="(item, index) in hasPermission"
                :key="index"
                :item="item"
            ></menu-item>
        </el-menu>
    </div>
</template>

<script>
import MenuItem from './components/menuItem';
import { mapGetters } from 'vuex';
export default {
    methods: {
        handleClose() {},
        handleOpen() {},
        handleSelect(index) {
            this.$router.push(index);
        },
    },
    computed: {
        ...mapGetters(['hasPermission']),
    },
    components: {
        MenuItem,
    },
};
</script>

<style lang="css">
.my-menu {
    min-height: 100vh;
    border-right: 1px solid #ebebeb;
}
.my-menu-admin {
    text-align: center;
    padding: 10px;
}
.my_menu_left {
    border-right: none !important;
}
</style>

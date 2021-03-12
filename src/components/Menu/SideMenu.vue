<template>
    <div class="my-menu">
        <h3 class="my-menu-admin">简单后台</h3>
        <el-menu
            class="my_menu_left"
            @select="handleSelect"
            :default-active="activeIndex"
        >
            <menu-item
                v-for="item in SideNavs"
                :key="item.id"
                :item="item"
            ></menu-item>
        </el-menu>
    </div>
</template>

<script>
import MenuItem from './components/menuItem';

export default {
    data() {
        return {
            activeIndex: window.location.pathname,
        };
    },
    methods: {
        handleSelect(index) {
            this.$router.push(index);
        },
    },
    computed: {
        SideNavs() {
            var active_app = this.$store.state.user.active_app;
            let arr;
            this.$store.state.user.permission.filter((item) => {
                if (item.path === active_app) {
                    arr = item.children;
                }
            });
            return arr;
        },
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

<template>
    <div class="top-menu">
        <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            @select="handleSelect"
        >
            <menu-item
                v-for="(item, index) in TopNavs"
                :key="index"
                :item="item"
            ></menu-item>
        </el-menu>
    </div>
</template>

<script>
import MenuItem from '../Menu/components/menuItem';

export default {
    data() {
        return {
            activeIndex: this.$store.state.user.active_app,
        };
    },
    computed: {
        TopNavs() {
            return this.$store.state.user.permission.map((item) => {
                let tmp = { ...item };
                delete tmp.children;
                return tmp;
            });
        },
    },
    methods: {
        handleSelect(e) {
            this.activeIndex = e;
            this.$store.dispatch('user/active_app', e);
            this.$router.push(e);
        },
    },
    components: {
        MenuItem,
    },
};
</script>

<style lang="css">
.el-menu {
    border-bottom: none !important;
}
</style>

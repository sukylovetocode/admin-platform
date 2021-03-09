<template>
    <div class="top-menu">
        <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            @select="handleSelect"
        >
            <menu-item
                v-for="(item, index) in top_menu"
                :key="index"
                :item="item"
                topMenu="true"
            ></menu-item>
        </el-menu>
    </div>
</template>

<script>
import MenuItem from '../Menu/components/menuItem';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            activeIndex: '/features',
        };
    },
    computed: {
        ...mapGetters(['top_menu']),
    },
    methods: {
        handleSelect(e) {
            this.activeIndex = e;
            this.$store.dispatch('user/active_app', e);
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

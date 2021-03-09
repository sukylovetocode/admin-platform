<template>
    <div class="my-menu">
        <h3 class="my-menu-admin">简单后台</h3>
        <el-menu
            class="my_menu_left"
            @select="handleSelect"
            v-if="active_app.children"
        >
            <menu-item
                v-for="(item, index) in active_app.children"
                :key="index"
                :item="item"
                topMenu="false"
            ></menu-item>
        </el-menu>
    </div>
</template>

<script>
import MenuItem from './components/menuItem';
import { mapGetters } from 'vuex';
export default {
    methods: {
        handleSelect(index) {
            this.$router.push(index);
        },
    },
    computed: {
        ...mapGetters(['active_app']),
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

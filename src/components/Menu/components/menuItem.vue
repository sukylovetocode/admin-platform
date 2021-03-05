<template>
    <div>
        <el-submenu :index="item.path" :key="item.path" v-if="item.children">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.meta.title ? item.meta.title : item.name }}</span>
            </template>
            <menu-item
                v-for="(child, index) in item.children"
                :key="index"
                :item="child"
            ></menu-item>
        </el-submenu>
        <el-menu-item
            v-if="!item.children && !item.redirect"
            :index="item.path"
            >{{ item.meta.title ? item.meta.title : item.name }}</el-menu-item
        >
    </div>
</template>

<script>
export default {
    name: 'menuItem',
    props: {
        item: Object,
    },
};
</script>

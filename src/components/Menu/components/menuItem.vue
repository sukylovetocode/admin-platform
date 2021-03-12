<template>
    <el-menu-item v-if="!item.children" :index="item.path" :key="item.path"
        ><i :class="item.meta ? (item.meta.icon ? item.meta.icon : '') : ''"></i
        >{{
            item.meta
                ? item.meta.title
                    ? item.meta.title
                    : item.name
                : item.name
        }}</el-menu-item
    >
    <el-submenu :index="item.path" :key="item.path" v-else>
        <template slot="title">
            <i
                :class="item.meta ? (item.meta.icon ? item.meta.icon : '') : ''"
            ></i>
            <span>{{
                item.meta
                    ? item.meta.title
                        ? item.meta.title
                        : item.name
                    : item.name
            }}</span>
        </template>
        <MenuItem
            v-for="(child, index) in item.children"
            :key="index"
            :item="child"
        ></MenuItem>
    </el-submenu>
</template>

<script>
export default {
    name: 'MenuItem',
    props: {
        item: Object,
    },
};
</script>

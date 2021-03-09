<template>
    <el-table :data="tableData" @selection-change="handleChange">
        <el-table-column type="selection" v-if="canSelect"></el-table-column>
        <el-table-column
            v-for="(item, index) in tableHeader"
            :key="index"
            :label="item.label"
            :prop="item.name"
            ><template slot-scope="scope">
                <slot :name="item.name" :scope="scope.row">
                    <fragment>{{ scope.row[item.name] }}</fragment>
                </slot>
            </template>
        </el-table-column>
        <el-table-column label="操作" v-if="!noAction">
            <template slot-scope="scope">
                <slot name="action" :scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleClick('EDIT', scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleClick('DELETE', scope.row)"
                        >删除</el-button
                    >
                    <el-button
                        size="mini"
                        type="success"
                        @click="handleClick('PUBLISHED', scope.row)"
                        >{{
                            scope.row.status === 0 ? '发布' : '下架'
                        }}</el-button
                    >
                </slot>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import Fragment from 'vue-fragment';
import Vue from 'vue';
Vue.use(Fragment);
export default {
    props: {
        tableData: Array,
        tableHeader: Array,
        noAction: Boolean,
        canSelect: Boolean,
    },
    methods: {
        handleClick(type, data) {
            this.$emit(type, data);
        },
        handleChange(data) {
            this.$emit('MULTI_SELECT', data);
        },
    },
};
</script>

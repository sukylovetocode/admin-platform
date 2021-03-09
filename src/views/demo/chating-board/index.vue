<template>
    <div>
        <normal-search
            :needClick="needClick"
            :searchType="searchType"
            @SEARCH="handleSearch"
        ></normal-search>
        <normal-table
            :tableHeader="tableHeader"
            :tableData="tableData"
            :noAction="noAction"
            :canSelect="canSelect"
            @EDIT="handleEdit"
            @DELETE="handleDelete"
            @PUBLISHED="handlePublished"
            @MULTI_SELECT="handleMultiSelect"
        >
            <template v-slot:status="slotProps">
                {{ slotProps.scope.status === 0 ? '未发布' : '已发布' }}
            </template>
            <template v-slot:release_time="slotProps">
                <el-popover trigger="hover" placement="top">
                    <p>ID: {{ slotProps.scope.id }}</p>
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{
                            slotProps.scope.release_time
                        }}</el-tag>
                    </div>
                </el-popover>
            </template>
        </normal-table>
    </div>
</template>

<script>
import NormalTable from '@/components/Table/NormalTable.vue';
import NormalSearch from '@/components/Table/NormalSearch.vue';
export default {
    data() {
        return {
            searchType: [
                {
                    title: 'ID值',
                    type: 'input',
                    name: 'id',
                },
                {
                    title: '状态',
                    type: 'dropdown',
                    name: 'status',
                    options: [
                        {
                            value: 0,
                            label: '未发布',
                        },
                        {
                            value: 1,
                            label: '已发布',
                        },
                    ],
                },
            ],
            tableHeader: [
                {
                    name: 'id',
                    label: 'ID',
                },
                {
                    name: 'release_time',
                    label: '发布时间',
                },
                {
                    name: 'type',
                    label: '类型',
                },
                {
                    name: 'title',
                    label: '标题',
                },
                {
                    name: 'status',
                    label: '状态',
                    // 0 草稿 1 发布
                },
            ],
            tableData: [
                {
                    id: 1,
                    release_time: '2021-12-29',
                    type: '新闻',
                    title: 'test',
                    status: 0,
                },
                {
                    id: 2,
                    release_time: '2021-12-29',
                    type: '小说',
                    title: 'test',
                    status: 1,
                },
            ],
            noAction: false,
            canSelect: true,
            needClick: false,
        };
    },
    components: {
        NormalTable,
        NormalSearch,
    },
    watch: {
        tableValue: function(newVal, oldVal) {
            console.log(newVal, oldVal);
        },
    },
    methods: {
        handleEdit(data) {
            console.log(data);
        },
        handleDelete(data) {
            console.log(data);
        },
        handlePublished(data) {
            console.log(data);
        },
        handleMultiSelect(data) {
            console.log(data);
        },
        handleSearch(data) {
            console.log(data);
        },
    },
};
</script>

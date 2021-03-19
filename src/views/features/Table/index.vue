<template>
    <div>
        <normal-search
            :needClick="needClick"
            :searchType="searchType"
            :needReset="needReset"
            @SEARCH="handleSearch"
        ></normal-search>
        <h3>基本使用</h3>
        <normal-table
            :tableHeader="tableHeader"
            :tableData="tableValue"
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
        </normal-table>

        <h3>无操作</h3>
        <normal-table
            :tableHeader="tableHeader"
            :tableData="tableValue"
            :noAction="true"
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
        <h3>自定义操作按钮</h3>
        <normal-table
            :tableHeader="tableHeader"
            :tableData="tableValue"
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
            <template v-slot:action>
                <el-button>自定义按钮</el-button>
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
            needClick: true,
            needReset: true,
            searchWord: {},
        };
    },
    components: {
        NormalTable,
        NormalSearch,
    },
    computed: {
        tableValue: function() {
            let arr = this.tableData;
            console.log(this.searchWord);
            for (let key in this.searchWord) {
                if (String(this.searchWord[key]) !== '') {
                    arr = arr.filter(
                        (item) =>
                            String(item[key]) === String(this.searchWord[key])
                    );
                }
            }
            return arr;
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
            this.searchWord = data;
        },
    },
};
</script>

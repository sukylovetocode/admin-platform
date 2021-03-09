<template>
    <div>
        <el-button type="primary" @click="handleExport">导出表格</el-button>
        <el-button>导入表格</el-button>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            id="my-table"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection"></el-table-column>
            <el-table-column
                v-for="item in tableHead"
                :prop="item.name"
                :label="item.label"
                :key="item.name"
            ></el-table-column>
        </el-table>
    </div>
</template>

<script>
import { createSheets, formatJson } from '@/utils/excel';

const tableHead = [
    {
        name: 'date',
        label: '日期',
    },
    {
        name: 'name',
        label: '姓名',
    },
    {
        name: 'address',
        label: '地址',
    },
];
const tableData = [
    {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
    },
    {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
    },
    {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
    },
    {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
    },
];
export default {
    data() {
        return {
            tableData,
            tableHead,
            selections: [],
        };
    },
    methods: {
        handleExport() {
            let head = tableHead.map((item) => item.name);
            let a = [];
            a.push(head);
            let data = formatJson(head, tableData);
            a.push(...data);
            createSheets(a, 'excel.xlsx');
        },
        handleSelectionChange(rows) {
            this.selections = rows;
        },
    },
};
</script>

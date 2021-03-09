<template>
    <div>
        <el-button type="primary" @click="handleExport">导出表格</el-button>
        <a href="https://docs.sheetjs.com/#writing-functions">文档</a>
        单文件上传：<input type="file" id="fileUp" @change="handleImport" />

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
// eslint-disable-next-line no-unused-vars
import { createSheets, formatJson } from '@/utils/excel';
// eslint-disable-next-line no-unused-vars
import Xlsx from 'xlsx';

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
            // let head = tableHead.map((item) => item.name);
            // let a = [];
            // a.push(head);
            // let data = formatJson(head, tableData);
            // a.push(...data);
            createSheets(this.selections, 'excel.xlsx');
        },
        handleSelectionChange(rows) {
            this.selections = rows;
            console.log(rows);
        },
        handleImport(e) {
            // 获取文档
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = function(e) {
                let data = e.target.result;
                let wb = Xlsx.read(data, {
                    type: 'binary',
                });
                console.log(
                    JSON.stringify(
                        Xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
                    )
                );
            };
            reader.readAsBinaryString(file);
        },
    },
};
</script>

<template>
    <div>
        <upload @IMPORT="handleData"></upload>
        <el-button @click="exportExcel">导出表格</el-button>
        <normal-table
            :tableData="tableData"
            :tableHeader="tableHeader"
            :noAction="true"
        ></normal-table>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { createSheets, formatJson } from '@/utils/excel';
import Upload from '@/components/Excel/upload';
import NormalTable from '@/components/Table/NormalTable';

export default {
    data() {
        return {
            tableData: [],
            tableHeader: [],
            selections: [],
        };
    },
    methods: {
        handleData(data) {
            let arr = [];
            data.headers.map((item) => {
                arr.push({
                    label: item,
                    name: item,
                });
            });
            this.tableHeader = arr;
            this.tableData = data.results;
        },
        exportExcel() {
            let head = this.tableHeader.map((item) => item.name);
            let a = [];
            a.push(head);
            let data = formatJson(head, this.tableData);
            a.push(...data);
            createSheets(a, 'excel.xlsx');
        },
    },
    components: {
        Upload,
        NormalTable,
    },
};
</script>

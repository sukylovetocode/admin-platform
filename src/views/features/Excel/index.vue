<template>
    <div>
        <el-button type="primary" @click="handleExport">导出表格</el-button>
        <el-table :data="tableData" stripe style="width: 100%" id="my-table">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
    </div>
</template>

<script>
import xlsx from 'xlsx';
export default {
    data() {
        return {
            tableData: [
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
            ],
        };
    },
    methods: {
        handleExport() {
            // 查找我们的表头
            let rows = document
                .getElementById('my-table')
                .querySelectorAll('tr')[0]
                .querySelectorAll('.is-leaf');
            let sheet_data = [];
            let head = [];
            for (let i = 0; i < rows.length; i++) {
                head.push(rows[i].innerText);
            }
            sheet_data.push(head);
            // 输入我们的内容
            let body = document
                .getElementById('my-table')
                .querySelectorAll('tbody')[0]
                .querySelectorAll('tr');
            let content = [];
            for (let i = 0; i < body.length; i++) {
                let a = body[i].querySelectorAll('td');
                for (let j = 0; j < a.length; j++) {
                    content.push(a[j].childNodes[0].innerText);
                }
                sheet_data.push(content);
                content = [];
            }
            let workbook = xlsx.utils.book_new();
            let worksheet = xlsx.utils.aoa_to_sheet(sheet_data);
            xlsx.utils.book_append_sheet(workbook, worksheet, '工作表');
            xlsx.writeFile(workbook, '试试.xlsx');
        },
    },
};
</script>

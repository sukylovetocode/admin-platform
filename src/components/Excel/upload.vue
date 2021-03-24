<template>
    <input type="file" id="fileUp" @change="importExcel" />
</template>

<script>
import { readExcel } from '@/utils/excel';
export default {
    methods: {
        importExcel(e) {
            var that = this;
            // 获取文档
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = function(e) {
                let data = e.target.result;
                let result = readExcel(data);
                that.$emit('IMPORT', result);
            };
            reader.readAsBinaryString(file);
        },
    },
};
</script>

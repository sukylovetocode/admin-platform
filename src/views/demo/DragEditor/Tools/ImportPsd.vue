<template>
    <div>
        <el-button @click="handleImport">aa</el-button>
    </div>
</template>

<script>
import PSD from 'psd.js';
export default {
    name: 'ImportPsd',
    methods: {
        handleImport() {
            PSD.fromURL('http://localhost:8080/demo.psd').then(function(psd) {
                let tree = psd.tree();
                console.log(tree);
            });
        },
    },
};
</script>

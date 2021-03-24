<template>
    <div class="editor-header">
        <h4 class="editor-title">可视化编辑器</h4>

        <div class="editor-btn">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="preview">预览</el-button>
            <el-button @click="redo">撤销</el-button>
            <el-button @click="reset">重做</el-button>
            <!-- <el-button @click="importPsd">导入PSD</el-button> -->
        </div>
    </div>
</template>

<script>
// NOTE PSD功能暂时不做
// import PSD from 'psd.js';
export default {
    methods: {
        reset() {
            this.$store.dispatch('editor/reset');
        },
        save() {
            // NOTE 思路 读取JSON 其实可以考虑配合后端进行动态生成页面 需要记录下来具体的id以及json 然后通过模板页面进行显示
            alert('暂时没做');
        },
        preview() {
            // NOTE 思路 匹配一个模态框，通过渲染手机模型及读取JSON在上面
            alert('暂时没做');
        },
        redo() {
            this.$store.dispatch('editor/redo');
        },
        // importPsd() {
        //     PSD.fromURL('http://localhost:8080/demo.psd').then(function(psd) {
        //         let tree = psd.tree();
        //         console.log(tree);
        //     });
        // },
    },
};
</script>

<style lang="scss">
.editor-header {
    height: 50px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 1px solid #ebebeb;
    margin-bottom: 10px;
    .editor-title {
        font-size: 20px;
        font-weight: 800;
    }
    .editor-btn {
        flex-grow: 1;
        margin-right: 10px;
        .el-button {
            float: right;
            margin: 0 10px;
        }
    }
}
</style>

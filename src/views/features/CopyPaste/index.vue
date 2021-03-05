<template>
    <div>
        <el-row>
            <el-col>
                <h2 id="content" ref="copy">这里是我们要复制的内容</h2>
                <el-button
                    type="primary"
                    @click="handlePluginsCopy"
                    data-clipboard-target="#content"
                    data-clipboard-action="copy"
                    id="copyBtn"
                    >使用插件复制</el-button
                >
                <el-button type="primary" @click="handleOriginCopy"
                    >原生复制</el-button
                >
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Clipboard from 'clipboard';
export default {
    methods: {
        handlePluginsCopy() {
            var clipboard = new Clipboard('#copyBtn');
            if (clipboard) {
                this.$message('复制成功');
            }
        },
        handleOriginCopy() {
            window.getSelection().removeAllRanges();
            const copyDOM = this.$refs.copy;
            const range = document.createRange();
            range.selectNode(copyDOM);
            window.getSelection().addRange(range);
            try {
                let successful = document.execCommand('copy');
                if (successful) {
                    this.$message('复制成功');
                }
            } catch (err) {
                this.$message({
                    type: 'error',
                    message: '复制失败',
                });
            }
            window.getSelection().removeAllRanges();
        },
    },
};
</script>

<style lang="css">
#content {
    margin: 10px 0;
}
</style>

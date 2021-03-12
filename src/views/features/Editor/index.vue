<template>
    <div>
        <el-switch
            v-model="editorType"
            active-text="富文本编辑器"
            inactive-text="Markdown编辑器"
        ></el-switch>
        <div class="editor">
            <component
                :is="editorType ? 'TinymceEditor' : 'MarkdownEditor'"
            ></component>
        </div>
    </div>
</template>

<script>
import MarkdownEditor from '@/components/Markdown/index.vue';
import TinymceEditor from '@/components/Tinymce/index.vue';
export default {
    data() {
        return {
            editorType: true,
        };
    },
    components: {
        MarkdownEditor,
        TinymceEditor,
    },
};
</script>

<style lang="css">
.editor {
    margin: 10px;
}
</style>

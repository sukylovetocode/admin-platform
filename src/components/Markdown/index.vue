<template>
    <editor :options="defaultOptions" height="500px" />
</template>

<script>
//https://github.com/nhn/tui.editor/tree/master/apps/vue-editor
import { Editor } from '@toast-ui/vue-editor';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
export default {
    data() {
        this.defaultOptions = {
            minHeight: '500px',
            language: 'en-US',
            useCommandShortcut: true,
            useDefaultHTMLSanitizer: true,
            usageStatistics: true,
            hideModeSwitch: false,
            toolbarItems: [
                'heading',
                'bold',
                'italic',
                'strike',
                'divider',
                'hr',
                'quote',
                'divider',
                'ul',
                'ol',
                'task',
                'indent',
                'outdent',
                'divider',
                'table',
                'image',
                'link',
                'divider',
                'code',
                'codeblock',
            ],
        };
        return {};
    },
    components: {
        Editor,
    },
};
</script>

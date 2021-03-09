<template>
    <div>
        <h3>
            插件:tui.editor
            <a
                href="https://github.com/nhn/tui.editor/tree/master/apps/vue-editor"
                >文档链接</a
            >
        </h3>
        <editor :options="defaultOptions" height="500px" />
    </div>
</template>

<script>
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

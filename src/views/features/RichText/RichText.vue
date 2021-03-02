<template>
    <div id="editor" :height="300"></div>
</template>

<script>
import tinymce from 'tinymce/tinymce'; // eslint-disable-line no-unused-vars
import 'tinymce/themes/silver';
import 'tinymce/icons/default';
import 'tinymce/langs/zh_CN';
import 'tinymce/skins/ui/oxide/skin.min.css';

export default {
    data() {
        return {
            content: '',
        };
    },
    mounted() {
        tinymce.init({
            selector: '#editor',
            language: 'zh_CN',
        });
    },
};
</script>

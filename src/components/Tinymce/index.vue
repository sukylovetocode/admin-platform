<template>
    <div id="editor"></div>
</template>

<script>
// https://www.tiny.cloud/docs/demo/full-featured/
import { init } from './init';

export default {
    data() {
        return {
            content: '',
        };
    },
    mounted() {
        this.editor = init();
    },
};
</script>

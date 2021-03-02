<template>
    <div>
        <pre v-highlightjs><code :class="codeType">
               <slot></slot>
        </code></pre>
    </div>
</template>

<script>
import Vue from 'vue';
import VueHighlightJS from 'vue-highlightjs';
import 'highlightjs/styles/atom-one-light.css';

Vue.use(VueHighlightJS);
export default {
    name: 'codeWrap',
    props: {
        codeType: {
            type: String,
            default: 'javascript',
        },
    },
};
</script>

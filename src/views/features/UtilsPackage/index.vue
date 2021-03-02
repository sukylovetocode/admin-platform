<template>
    <div>
        <code-wrap>
            var func = function(){ 'ddd' }
        </code-wrap>
    </div>
</template>

<script>
import codeWrap from './components/codeWrap';
export default {
    name: 'UtilsPackage',
    components: {
        codeWrap,
    },
};
</script>

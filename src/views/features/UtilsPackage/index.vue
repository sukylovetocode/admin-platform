<template>
    <div>
        <h5>获取视口高度</h5>
        <code-wrap class="javascript">{{ this.getViewHeight }}</code-wrap>
    </div>
</template>

<script>
import codeWrap from './components/codeWrap';
import { getViewHeight } from '@/utils/base';
export default {
    name: 'UtilsPackage',
    data() {
        return {
            getViewHeight,
        };
    },
    components: {
        codeWrap,
    },
};
</script>

<style lang="css">
pre {
    white-space: pre-line;
}
</style>

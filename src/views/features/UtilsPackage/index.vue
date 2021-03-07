<template>
    <div>
        <h5>获取视口高度</h5>
        <code-wrap class="javascript">{{ this.getViewHeight }}</code-wrap>
        <code-wrap class="javascript">{{ this.getSelection }}</code-wrap>
        <code-wrap class="javascript">{{ this.setSelection }}</code-wrap>
    </div>
</template>

<script>
import codeWrap from './components/codeWrap';
import { getViewHeight,getSelection,setSelection } from '@/utils/base';
export default {
    name: 'UtilsPackage',
    data() {
        return {
            getViewHeight,
            setSelection,
            getSelection
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

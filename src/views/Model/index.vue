<template>
    <div :style="{ width: '100%', height: '100%' }">
        <h3>三维模型渲染</h3>
        <model-views></model-views>
    </div>
</template>

<script>
//https://github.com/JChehe/blog/issues/44
//https://github.com/JChehe/blog/issues/14

import ModelViews from '@/components/Model/modelViews.vue';
export default {
    components: {
        ModelViews,
    },
};
</script>

<style lang="css" scoped>
#container {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
</style>

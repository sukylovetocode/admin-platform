<template>
    <model-views></model-views>
</template>

<script>
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

<template>
    <div class="text">{{ item.propVal }}</div>
</template>

<script>
export default {
    name: 'DText',
    props: {
        item: Object,
    },
};
</script>

<style lang="css">
.text {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>

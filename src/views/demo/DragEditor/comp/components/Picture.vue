<template>
    <img :src="item.propImg" class="img" />
</template>

<script>
export default {
    name: 'Picture',
    props: {
        item: Object,
    },
};
</script>

<style lang="css">
.img {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>

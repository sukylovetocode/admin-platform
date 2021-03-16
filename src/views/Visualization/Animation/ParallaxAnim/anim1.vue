<template>
    <div class="container">
        <parallax>
            <img :src="require('@/assets/images/sky.jpg')" alt="" />
        </parallax>
        <parallax :fixed="true" :sectionHeight="10"
            ><h2 class="text">GOOD NIGHT</h2></parallax
        >
    </div>
</template>

<script>
import Parallax from 'vue-parallaxy';
export default {
    components: {
        Parallax,
    },
};
</script>

<style lang="css">
.container {
    width: 100%;
    height: 100%;
    position: relative;
}
.text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>

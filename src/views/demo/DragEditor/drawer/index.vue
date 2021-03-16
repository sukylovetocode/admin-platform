<template>
    <div class="wrapper">
        <div class="web-container">
            <span
                v-for="(item, index) in data"
                :key="index"
                @click="handleActiveItem(item)"
            >
                <Drag :item="item" @drag="drag"></Drag>
            </span>
        </div>
    </div>
</template>

<script>
import Drag from './Drag';
export default {
    props: {
        data: Array,
    },
    components: {
        Drag,
    },
    methods: {
        drag(item) {
            // 保存改变
            console.log(item);
        },
        handleActiveItem(item) {
            this.$emit('active_item', item);
        },
    },
};
</script>

<style lang="css">
.wrapper {
    width: 100%;
    height: 1000px;
    background: #ebebeb;
    display: flex;
    justify-content: center;
    align-items: center;
}
.web-container {
    width: 375px;
    height: 800px;
    position: relative;
    background: #fff;
}
</style>

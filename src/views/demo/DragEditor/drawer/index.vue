<template>
    <div class="wrapper">
        <div class="web-container">
            <div v-if="data.length">
                <span
                    v-for="(item, index) in data"
                    :key="index"
                    @click="handleActiveItem(index)"
                >
                    <Drag :item="item" @drag="drag"></Drag>
                </span>
            </div>
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
            this.$store.dispatch('editor/change', item);
        },
        handleActiveItem(index) {
            this.$store.dispatch('editor/active_item', index);
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

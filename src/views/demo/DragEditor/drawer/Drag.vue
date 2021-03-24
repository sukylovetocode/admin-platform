<template>
    <vue-draggable-resizable
        :id="item.id"
        @dragging="onDrag"
        @resizing="onResize"
        @dragstop="onDragStop"
        :w="item.style.width"
        :h="item.style.height"
        :x="item.style.left"
        :y="item.style.top"
        :style="{ zIndex: item.style.zIndex }"
    >
        <component
            :is="item.name"
            :item="item"
            :style="getComponentStyle(item.style)"
        ></component
    ></vue-draggable-resizable>
</template>

<script>
import Components from '../comp/install';
import Vue from 'vue';
Vue.use(Components);
import VueDraggableResizable from 'vue-draggable-resizable';
// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
export default {
    props: {
        item: Object,
    },
    components: {
        VueDraggableResizable,
    },

    methods: {
        getComponentStyle(styles) {
            let result = {};
            const needUnit = ['width', 'height', 'top', 'left'];
            for (let key in styles) {
                if (!needUnit.includes(key)) {
                    result[key] = styles[key];
                }
            }
            return result;
        },
        onDrag(x, y) {
            this.item.style.left = x;
            this.item.style.top = y;
        },
        onResize(x, y, width, height) {
            // 设置parent无法设置resize
            this.item.style.left = x;
            this.item.style.top = y;
            this.item.style.width = width;
            this.item.style.height = height;
        },
        onDragStop() {
            this.$emit('drag', this.item);
        },
        onResizeStop() {
            this.$emit('drag', this.item);
        },
    },
};
</script>

<style lang="css">
.vdr {
    border: none;
}
</style>

<template>
    <div>
        <h4>组件库</h4>
        <div
            v-for="item in componentsList"
            :key="item.id"
            class="component_btn"
            @click="handleAddComponent(item)"
        >
            <i :class="item.icon"></i>{{ item.title }}
        </div>
    </div>
</template>

<script>
import componentsList from './componentsList';
export default {
    data() {
        return {
            componentsList,
        };
    },
    methods: {
        handleAddComponent(component) {
            this.$store.dispatch('editor/add', component);
        },
    },
};
</script>

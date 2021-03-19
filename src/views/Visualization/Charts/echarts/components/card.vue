<template>
    <div class="card-wrapper">
        <h3>{{ title }}</h3>
        <div class="card-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
    },
};
</script>

<style lang="scss">
.card-wrapper {
    box-shadow: 1px 0 2px 1px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    padding: 15px;
    box-sizing: border-box;
    display: inline-block;
    margin: 10px;
    h3 {
        text-align: center;
        font-weight: 800;
        font-size: 25px;
    }
    .card-content {
        margin: 0 auto;
    }
}
</style>

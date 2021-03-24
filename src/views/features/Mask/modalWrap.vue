<template>
    <div class="content" v-show="show">
        <slot name="content"></slot>
    </div>
</template>

<script>
const mixinObj = {
    methods: {
        addModalDom() {
            this.a = document.createElement('div');
            this.a.style.position = 'fixed';
            this.a.style.left = 0;
            this.a.style.top = 0;
            this.a.style.right = 0;
            this.a.style.bottom = 0;
            this.a.style.zIndex = 1;
            this.a.classList.add('mask');
            this.a.style.background = 'rgba(0, 0, 0, 0.5)';
            document.body.appendChild(this.a);
        },
        removeDom() {
            document.body.removeChild(this.a);
        },
    },
};

export default {
    props: {
        show: Boolean,
    },
    mixins: [mixinObj],
    watch: {
        show(newVal) {
            if (newVal) {
                this.addModalDom();
            } else {
                this.removeDom();
            }
        },
    },
    methods: {
        closeModal() {
            this.modalShow = false;
        },
        handleClose() {},
    },
};
</script>

<style lang="css">
.content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #ebebeb;
    padding: 20px;
    z-index: 5;
}
</style>

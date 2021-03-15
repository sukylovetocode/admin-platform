<template>
    <div>
        <div :id="ID" :style="'width:' + width + 'px'"></div>
    </div>
</template>

<script>
import lottie from 'lottie-web';

export default {
    name: 'LottieWeb',
    props: {
        loop: {
            type: Boolean,
            default: true,
        },
        autoplay: {
            type: Boolean,
            default: true,
        },
        animJson: {
            type: Object,
        },
        width: {
            type: Number,
            default: 100,
        },
        playOrPause: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        // 随机生成一个ID
        this.ID = Math.random()
            .toString(36)
            .slice(-6);
        return {
            direction: 1,
        };
    },
    mounted() {
        this.anim = lottie.loadAnimation({
            container: document.getElementById(this.ID), // the dom element
            renderer: 'svg',
            loop: this.loop,
            autoplay: this.autoplay,
            animationData: this.animJson,
        });
    },
};
</script>

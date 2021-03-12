<template>
    <div>
        <h2>配合AE插件：bodymovin</h2>
        <div id="anim1" style="width:100px"></div>
        <el-button @click="stop">stop</el-button>
        <el-button @click="play">play</el-button>
        <el-button @click="pause">pause</el-button>
        <el-button @click="setSpeed(2)">speed</el-button>
        <el-button @click="goToAndStop(10)">到某一帧暂停</el-button>
        <el-button @click="goToAndPlay(10)">到某一帧开始</el-button>
        <el-button @click="playSegments(0, 20)">播放某一区间动画</el-button>
        <el-button @click="setDirection">调换方向</el-button>
        <el-button @click="destroy">销毁动画</el-button>
        <anim-container
            :animJson="require('../../../assets/anim/anim1.json')"
        ></anim-container>
        <a href="http://airbnb.io/lottie/#/web">参考文档</a>
    </div>
</template>

<script>
import animContainer from './components/animContainer';
import lottie from 'lottie-web';

export default {
    name: 'LottieWeb',
    data() {
        return {
            direction: 1,
        };
    },
    components: {
        animContainer,
    },
    destroyed() {
        this.anim.destroy();
    },
    mounted() {
        this.anim = lottie.loadAnimation({
            container: document.getElementById('anim1'), // the dom element
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../../assets/anim/anim1.json'),
        });
        this.anim.addEventListener('data_ready', () => {
            console.log('数据加载完成');
        });
        this.anim.addEventListener('complete', function() {
            console.log('动画播放完成');
        });
        this.anim.addEventListener('loopComplete', function() {
            console.log('动画播放完成');
        });
        this.anim.addEventListener('destroy', function() {
            console.log('动画销毁');
        });
    },
    methods: {
        pause() {
            this.anim.pause();
        },
        play() {
            this.anim.play();
        },
        stop() {
            this.anim.stop();
        },
        setSpeed(speed) {
            this.anim.setSpeed(speed);
        },
        goToAndStop(frame) {
            this.anim.goToAndStop(frame);
        },
        goToAndPlay(frame) {
            this.anim.goToAndPlay(frame);
        },
        playSegments(start, end) {
            this.anim.playSegments([start, end], false);
        },
        setDirection() {
            this.direction === 1 ? (this.direction = -1) : (this.direction = 1);
            this.anim.setDirection(this.direction);
        },
        destroy() {
            this.anim.destroy();
        },
    },
};
</script>

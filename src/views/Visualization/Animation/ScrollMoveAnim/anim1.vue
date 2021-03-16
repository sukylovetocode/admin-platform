<template>
    <div>
        <section class="container">
            <img
                :src="require('@/assets/images/sky.jpg')"
                alt="sky"
                class="sky"
            />
            <img
                :src="require('@/assets/images/moon.png')"
                alt=""
                class="moon"
            />
            <img
                :src="require('@/assets/images/mountain.png')"
                alt=""
                class="mountain"
            />
            <h3 class="text">GOOD NIGHT</h3>
        </section>
        <section class="section2">TO BE CONTINUE</section>
    </div>
</template>

<script>
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger); // same as scrollmagic but have a company mantain

export default {
    mounted() {
        gsap.timeline({
            scrollTrigger: {
                trigger: '.container',
                start: 'center center', //anim start
                end: 'bottom top', // anim end
                markers: true, // 标记
                scrub: true,
                pin: true,
            },
        })
            .from('.moon', { x: innerWidth * -0.25, y: '200px' })
            .from('.mountain', { y: innerHeight * 0.9 })
            .from('.text', { x: innerWidth * -1 });
    },
};
</script>

<style lang="css">
* {
    margin: 0;
    padding: 0;
}
.container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}
.sky {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.moon {
    width: 100px;
    position: absolute;
    left: 300px;
    top: 50px;
}
.mountain {
    width: 100%;
    object-fit: cover;
    position: absolute;
    bottom: -200px;
    left: 0px;
}
.container h3 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 70px;
}
.section2 {
    background: #000;
    width: 100%;
    height: 100vh;
    text-align: center;
    line-height: 100vh;
    color: #fff;
}
</style>

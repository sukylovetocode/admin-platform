import Picture from './Picture.vue';
import Swiper from './Swiper.vue';
const components = [Picture, Swiper];

export default function(Vue) {
    components.forEach((component) => {
        Vue.component(component.name, component);
    });
}

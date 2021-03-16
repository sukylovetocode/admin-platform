import Picture from './Picture.vue';
import Swiper from './Swiper.vue';
import DText from './Text.vue';
const components = [Picture, Swiper, DText];

export default function(Vue) {
    components.forEach((component) => {
        Vue.component(component.name, component);
    });
}

import Picture from './components/Picture.vue';
import DText from './components/Text.vue';
const components = [Picture, DText];

const install = function(Vue) {
    if (install.installed) return;
    install.installed = true;
    components.forEach((component) => {
        Vue.component(component.name, component);
    });
};

export default install;

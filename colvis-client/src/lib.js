import ColInputMain from './components/Input/Main.vue';
import { getDataFromContainer } from './assets/utils';

const ColvisPlugin = {
    install(Vue, options) {
        Vue.component('ColInputMain', ColInputMain);
        Vue.prototype.$getDataFromContainer = getDataFromContainer;
    },
};

export default ColvisPlugin;

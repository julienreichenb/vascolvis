import _Vue from 'vue';
import ColInputMain from './components/Input/Main.vue';
import { ColvisUseOptions } from 'types';
import { getDataFromContainer } from './assets/utils';

const ColvisPlugin = {
    install(Vue: typeof _Vue, options?: ColvisUseOptions): void {
        if (!options || !options.Vuetify) throw new Error('No Vuetify detected during the installation of ColVis');
        Vue.use(options.Vuetify);
        Vue.component('ColInputMain', ColInputMain);
        Vue.prototype.$getDataFromContainer = getDataFromContainer;
    },
};

export default ColvisPlugin;

import * as Vue from 'vue';

const VueDefault = Vue.default ? Vue.default : Vue

export const isVue2 = VueDefault?.version?.startsWith('2.');

export default isVue2

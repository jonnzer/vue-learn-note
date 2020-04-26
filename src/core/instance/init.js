import { initRender } from "./render";
import { initProxy } from "./proxy";

export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        const vm = this
        vm.$options = options

        /*
        * mount需要用到的一系列方法和数据 包括
        * vm._render
        * createElement()
        *
        * */
        initProxy(vm)
        initRender(vm)

        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }
}
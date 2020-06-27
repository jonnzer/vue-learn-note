import { initRender } from "./render";
import { initProxy } from "./proxy";

export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        const vm = this
        vm.$options = options

        /*
        * mount需要用到的一系列方法和数据 包括
        * vm._render
        *
        * vm._c  = vm.createElement 创建vnode
        *
        * */
        initProxy(vm)
        initRender(vm)

        if (vm.$options.el) {
            vm.$mount(vm.$options.el) // 看来它调用是必须在$mount定义完整的时候才会触发
        }
    }
}
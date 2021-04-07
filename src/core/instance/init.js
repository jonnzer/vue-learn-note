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

        /**
         *  对vm.$options的赋值以及处理
         * (1)vue.component创造组件的情况，用vnode创建组件实例 eg: Vue.component('demo',{ prop: ['es'], template: `<div>1</div>` })
         * (2)非组件，以根实例的方式创建，会执行mergeOption eg: new Vue({ el: '#demo' })
         * */



        if (vm.$options.el) {
            vm.$mount(vm.$options.el) // 看来它调用是必须在$mount定义完整的时候才会触发
        }
    }
}
export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        const vm = this
        vm.$options = options
        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }
}
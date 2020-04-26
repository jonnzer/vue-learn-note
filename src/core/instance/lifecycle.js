import { createEmptyVNode } from "../vdom/vnode";

export function mountComponent(vm, el) {
    vm.$el = el
    // if options里没有render函数传进
    if (!vm.$options.render) {
        vm.$options.render  = createEmptyVNode
    }
    let updateComponent
    updateComponent = () => { // need vm._render()
        const vnode = vm._render()
        vm._update(vnode)
    }
    return vm
}


// create vue.prototype._update
// define vm._vnode

export function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        const vm = this
        const prevVnode = vm._vnode // 这步缓存是没咋搞懂
        vm._vnode = vnode
        if (!prevVnode) { // if no vm._vnode
           vm.$el = vm.__patch__(vm.$el, vnode)
        } else {
            vm.$el = vm.__patch__(prevVnode, vnode)
        }

    }
}
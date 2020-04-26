/*
* 定义了vue的_render
* */

import { createElement } from "../vdom/create-element";

export function renderMixin(Vue) {
    Vue.prototype._render = function () {
        const vm = this
        const { render, _parentVnode } = vm.$options
        vm.$vnode = _parentVnode
        let vnode
        vnode = render.call(vm._renderProxy, vm.$createElement)
        return vnode
    }
}

export function initRender(vm) { // vue init 初始化render
    vm._vnode = null
    const options = vm.$options
    vm.$createElement = (a, b, c, d) => createElement(vm,a,b,c,d)
}
/*
* 定义了vue的_render
* */

import { createElement } from "../vdom/create-element";

export function renderMixin(Vue) {
    Vue.prototype._render = function () { // 生成vnode
        const vm = this
        const { render, _parentVnode } = vm.$options // 出错点，render没定义好
        vm.$vnode = _parentVnode
        let vnode
        vnode = render.call(vm._renderProxy, vm.$createElement)
        return vnode
    }
}

export function initRender(vm) { // vue init 初始化render
    vm._vnode = null
    const options = vm.$options
    vm._c = (a, b, c, d) => createElement(vm, a ,b, c, d) // _c 和 createElement 是一样的
    vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d)
}
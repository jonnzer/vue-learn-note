/*
* renderMixin initRender等函数
* 创建元素需要用到
* */

import { isDef } from "../util/index";
import VNode, { createEmptyVNode } from "./vnode";
import { createComponent } from "./create-component";


export function createElement(context, tag, data, children) {
    return _createElement(context, tag, data, children)
}

export function _createElement(context, tag, data, children) {
    // if (isDef(data)) {
    //     return createEmptyVNode()
    // }
    let vnode
    if (typeof tag === 'string') {
        vnode = new VNode(tag, data, children,
            undefined, undefined, context)
    } else {
        vnode = createComponent(tag, data, context, children)
    }
    return vnode
}
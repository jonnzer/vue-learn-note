/*
* 节点的创造
* 给create-element.js的createElement方法调用
* Ctor
* data: NodeData,
*
* */

import VNode from './vnode'

export function createComponent(Ctor, data, context, children, tag) {
    data = data || {}
    const vnode = new VNode(
        `test`,
        data,
        undefined,
        undefined,
        undefined,
        context
        )
    return vnode
}
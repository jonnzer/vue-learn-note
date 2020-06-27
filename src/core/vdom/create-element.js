/*
* renderMixin initRender等函数
* 创建元素需要用到
* */
import config from "../config";
import { isDef } from "../util/index";
import VNode, { createEmptyVNode } from "./vnode";
import { createComponent } from "./create-component";


export function createElement(context, tag, data, children) {
    return _createElement(context, tag, data, children)
}

/**
 *
 * @param context   VNode 的上下文环境,是component类型
 * @param tag       表示标签，它可以是一个字符串，也可以是一个 Component
 * @param data      VNode的数据，是VNode类型 可以在源代码的 flow/vnode.js 里找到数据结构的定义
 * @param children  当前VNode的子节点，标准的VNode数组
 * @param normalizationType 子节点规范类型 此参数会决定children转化为vnode数组的方式，主要参考render函数是编译还是用户手写的
 * @returns {*}
 * @private
 * @feature1 children的规范化
 * @feature2 VNode的创建
 */
export function _createElement(context, tag, data, children) {
    // if (isDef(data)) {
    //     return createEmptyVNode()
    // }
    let vnode
    if (typeof tag === 'string') {
        vnode = new VNode(config.parsePlatformTagName(tag), data, children,
            undefined, undefined, context)
    }
    return vnode
}
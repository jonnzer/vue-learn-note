/*
* 虚拟节点 VNode
* */
export default class VNode{
    constructor(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
        this.tag = tag
        this.data = data
        this.children = children
        this.text = text
        this.elm = elm
        this.context = context
        this.componentOptions = componentOptions
        this.asyncFactory = asyncFactory
        this.componentInstance = undefined
    }
    get child() {
        return this.componentInstance
    }
}

export function createEmptyVNode(text) {
    const node = new VNode()
    node.text = text
    return node
}
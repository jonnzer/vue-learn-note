/*
*   封装一些Dom的常用操作
* */

/**
 *
 * @param tagName 标签名
 * @param vnode 虚拟节点
 * @returns 真实dom
 */
export function createElement(tagName, vnode) { // vnode转换真实dom
    const elm = document.createElement(tagName)
    if (tagName !== 'select') {
        return elm
    }
    return elm
}

/**
 *
 * @param node 父亲
 * @param child 儿子
 * 方法将一个节点附加到指定父节点的子节点列表的末尾处。如果将被插入的节点已经存在于当前文档的文档树中，那么 appendChild() 只会将它从原先的位置移动到新的位置（不需要事先移除要移动的节点）。
 * mdn: https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild
 */
export function appendChild(node, child) {
    node.appendChild(child)
}

export function tagName(node) { // 返回标签名
    return node.tagName;
}

export function parentNode(node) { // return parentNode
    return node.parentNode
}

export function nextSibling(node) { // return nextSibling
    return node.nextSibling
}

export function insertBefore(parentNode, newNode, referenceNode) { // 在什么节点前插入什么节点
    parentNode.insertBefore(newNode,referenceNode)
}
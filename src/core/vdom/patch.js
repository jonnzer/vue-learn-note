/**
 * 这个文件的性能至关重要，可以跳过语法检查
 * @returns {patch}
 */
import VNode from './vnode'

export function createPatchFunction(backend) {

    const { modules, nodeOps } = backend

    // function define
    function createChildren(vnode, children, insertedVnodeQueue) { // 创建子节点
        if (Array.isArray(children)) {
            for (let i = 0;i < children.length; i++) {
                createElm(children[i], undefined, vnode.elm)
            }
        }
    }

    function insert(parent, elm, ref) {
        if (ref) {
            if (nodeOps.parentNode(ref) === parent) {
                nodeOps.insertBefore(parent, elm, ref)
            }
        } else {
            nodeOps.appendChild(parent, elm)
        }
    }

    function emptyNodeAt(elm) { // 返回Vnode
        return new VNode(nodeOps.tagName(elm).toLowerCase(), {},[], undefined, elm)
    }

    function createElm(
        vnode, // 虚拟dom
        insertedVnodeQueue, // ?
        parentElm, // 父元素
        refElm // 相邻的子元素
    ) { // 虚拟dom 转换 真实dom
        const data = vnode.data
        const children = vnode.children
        const tag = vnode.tag

       vnode.elm = nodeOps.createElement(tag, vnode)

        // createChildren
        createChildren(vnode, children, insertedVnodeQueue)

        // insert
        insert(parentElm, vnode.elm, refElm) // 插入渲染好的节点

    }
    return function patch(oldVnode, vnode) {
        const insertedVnodeQueue = []
        oldVnode = emptyNodeAt(oldVnode)
        const oldElm = oldVnode.elm
        const parentElm = nodeOps.parentNode(oldElm)
        createElm(vnode,
                  insertedVnodeQueue,
                  parentElm,
                  nodeOps.nextSibling(oldElm)
                )
        return vnode.elm
    }
}
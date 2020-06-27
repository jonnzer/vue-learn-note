/*!
 * Vue.js v1.0.0
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Vue = factory());
}(this, (function () { 'use strict';

    // 空函数
    function noop(a,b,c) {}
    // 返回相同值
    var identity = function (_) { return _; };

    var config = ({
        parsePlatformTagName: identity
    });

    var inBrowser = typeof window !== 'undefined';

    /*
    * 虚拟节点 VNode
    * */
    var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
        this.tag = tag;
        this.data = data;
        this.children = children;
        this.text = text;
        this.elm = elm;
        this.context = context;
        this.componentOptions = componentOptions;
        this.asyncFactory = asyncFactory;
        this.componentInstance = undefined;
    };

    var prototypeAccessors = { child: { configurable: true } };
    prototypeAccessors.child.get = function () {
        return this.componentInstance
    };

    Object.defineProperties( VNode.prototype, prototypeAccessors );

    function createEmptyVNode(text) {
        var node = new VNode();
        node.text = text;
        return node
    }

    /*
    * renderMixin initRender等函数
    * 创建元素需要用到
    * */


    function createElement(context, tag, data, children) {
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
    function _createElement(context, tag, data, children) {
        // if (isDef(data)) {
        //     return createEmptyVNode()
        // }
        var vnode;
        if (typeof tag === 'string') {
            vnode = new VNode(config.parsePlatformTagName(tag), data, children,
                undefined, undefined, context);
        }
        return vnode
    }

    /*
    * 定义了vue的_render
    * */

    function renderMixin(Vue) {
        Vue.prototype._render = function () {
            var vm = this;
            var ref = vm.$options;
            var render = ref.render;
            var _parentVnode = ref._parentVnode; // render ???
            vm.$vnode = _parentVnode;
            var vnode;
            vnode = render.call(vm._renderProxy, vm.$createElement);
            return vnode
        };
    }

    function initRender(vm) { // vue init 初始化render
        vm._vnode = null;
        var options = vm.$options;
        vm.$createElement = function (a, b, c, d) { return createElement(vm,a,b,c); };
    }

    // renderMixin 需要用到  _renderProxy

    var hasProxy = typeof Proxy !== 'undefined';

    var initProxy;

    var hasHandler = { // renderProxy的has钩子 with语句触发
        has: function has(target, key) {
            var has = key in target;
            if (key in target.$data) {
                return
            }
            return has
        }
    };

    var getHandler = { // renderProxy的get钩子
        get: function get (target, key) {
            if (key in target.$data) {
                return
            }
            return target[key]
        }
    };

    initProxy = function initProxy(vm) {
        if (hasProxy) {
            var options = vm.$options;
            var handlers = options.render ? getHandler : hasHandler;
            vm._renderProxy = new Proxy(vm, handlers);
        }
        else {
            vm._renderProxy = vm;
        }
    };

    function initMixin(Vue) {
        Vue.prototype._init = function (options) {
            var vm = this;
            vm.$options = options;

            /*
            * mount需要用到的一系列方法和数据 包括
            * vm._render
            * createElement ()
            *
            * */
            initProxy(vm);
            initRender(vm);

            if (vm.$options.el) {
                vm.$mount(vm.$options.el);
            }
        };
    }

    function mountComponent(vm, el) {
        vm.$el = el;
        // if options里没有render函数传进
        if (!vm.$options.render) {
            vm.$options.render  = createEmptyVNode;
        }
        var updateComponent;
        updateComponent = function () { // need vm._render()
            var vnode = vm._render();
            vm._update(vnode);
        };
        updateComponent();
        return vm
    }


    // create vue.prototype._update
    // define vm._vnode
    function lifecycleMixin(Vue) {
        /**
         *
         * @param vnode
         * @private
         * @callTime （1）首次渲染 （2）数据更新（响应式原理会提及）
         * @core vm.__patch__
         */
        Vue.prototype._update = function (vnode) {
            var vm = this;
            var prevVnode = vm._vnode; // 这步缓存是没咋搞懂
            vm._vnode = vnode;
            if (!prevVnode) { // if no vm._vnode
               vm.$el = vm.__patch__(vm.$el, vnode);
            } else {
               vm.$el = vm.__patch__(prevVnode, vnode);
            }
        };
    }

    function Vue (options) {
      if (
        !(this instanceof Vue)
      ) {
        warn('Vue is a constructor and should be called with the `new` keyword');
      }
      this._init(options);
    }

    initMixin(Vue);
    lifecycleMixin(Vue); // 定义vue.prototype._update 利用vnode
    renderMixin(Vue); // 定义vue.prototype._render 创建Vnode

    /*
    * queryselet dom
    * */
    function query(el) { // el 可能为string 和 element类型
        if (typeof el === 'string') {
            var selected = document.querySelector(el);
            if (!selected) {
                return document.createElement('div')
            }
            return selected
        } else {
            return el
        }
    }

    /*
    *   封装一些Dom的常用操作
    * */

    /**
     *
     * @param tagName 标签名
     * @param vnode 虚拟节点
     * @returns 真实dom
     */
    function createElement$1(tagName, vnode) { // vnode转换真实dom
        var elm = document.createElement(tagName);
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
    function appendChild(node, child) {
        node.appendChild(child);
    }

    function tagName(node) { // 返回标签名
        return node.tagName;
    }

    function parentNode(node) { // return parentNode
        return node.parentNode
    }

    function nextSibling(node) { // return nextSibling
        return node.nextSibling
    }

    function insertBefore(parentNode, newNode, referenceNode) { // 在什么节点前插入什么节点
        parentNode.insertBefore(newNode,referenceNode);
    }

    var nodeOps = /*#__PURE__*/Object.freeze({
        __proto__: null,
        createElement: createElement$1,
        appendChild: appendChild,
        tagName: tagName,
        parentNode: parentNode,
        nextSibling: nextSibling,
        insertBefore: insertBefore
    });

    /**
     * 这个文件的性能至关重要，可以跳过语法检查
     * @returns {patch}
     */

    function createPatchFunction(backend) {

        var modules = backend.modules;
        var nodeOps = backend.nodeOps;

        // function define
        function createChildren(vnode, children, insertedVnodeQueue) { // 创建子节点
            if (Array.isArray(children)) {
                for (var i = 0;i < children.length; i++) {
                    createElm(children[i], undefined, vnode.elm);
                }
            }
        }

        function insert(parent, elm, ref) {
            if (ref) {
                if (nodeOps.parentNode(ref) === parent) {
                    nodeOps.insertBefore(parent, elm, ref);
                }
            } else {
                nodeOps.appendChild(parent, elm);
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
            var data = vnode.data;
            var children = vnode.children;
            var tag = vnode.tag;

           vnode.elm = nodeOps.createElement(tag, vnode);

            // createChildren
            createChildren(vnode, children);

            // insert
            insert(parentElm, vnode.elm, refElm);

        }
        return function patch(oldVnode, vnode) {
            var insertedVnodeQueue = [];
            oldVnode = emptyNodeAt(oldVnode);
            var oldElm = oldVnode.elm;
            var parentElm = nodeOps.parentNode(oldElm);
            createElm(vnode,
                      insertedVnodeQueue,
                      parentElm,
                      nodeOps.nextSibling(oldElm)
                    );
            return vnode.elm
        }
    }

    /**
     * (1) patch vnode补丁  diff算法可能出于此处
     */

    /**
     * @name createPatchFunction
     * @param nodeOps 封装了平台dom操作方法
     * @param modules 平台模块
     */
    var patch = createPatchFunction({ nodeOps: nodeOps });

    // /*  */


    Vue.prototype.__patch__ = inBrowser ? patch : noop;

    // public mount method
    Vue.prototype.$mount = function (el) {
        el = el && inBrowser ? query(el) : undefined;
        return mountComponent(this, el)
    };

    /*  */

    var mount = Vue.prototype.$mount;

    Vue.prototype.$mount = function (el) {
        return mount.call(this, el)
    };

    return Vue;

})));

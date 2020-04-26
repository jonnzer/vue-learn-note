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

    function initMixin(Vue) {
        Vue.prototype._init = function (options) {
            var vm = this;
            vm.$options = options;
            if (vm.$options.el) {
                vm.$mount(vm.$options.el);
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

    var inBrowser = typeof window !== 'undefined';

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

    function mountComponent(vm, el) {
        vm.$el = el;
        // if options里没有render函数传进
        if (!vm.$options.render) {
            vm.$options.render  = createEmptyVNode;
            console.log(vm);
        }
        return vm
    }

    // /*  */


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

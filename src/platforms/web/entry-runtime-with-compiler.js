/* @flow */

import Vue from './runtime/index'
import { query } from "./util";
import { compileToFunctions } from "./compiler/index";

const mount = Vue.prototype.$mount // 缓存了 rumtime/index.js 的 public method $mount

const idToTemplate = function (id) { // convert id to template
    const el = query(id)
    return el && el.innerHTML
}

function getOuterHTML(el) { // 返回html结构
    if (el.outerHTML) {
        return el.outerHTML
    } else {
        // 用一个盒子装着dom，再把dom返回
        // cloneNode(true) 深克隆 一个dom 包括它底下所有子节点
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/cloneNode
        const container = document.createElement('div')
        container.appendChild(el.cloneNode(true))
        return container.innerHTML
    }
}

/**
 * @fnName $mount
 * @param el: string | element
 * @feature: define options.render
 * @feature: convert el to dom
 * @returns vm.mount(el)
 */
Vue.prototype.$mount = function (el) {
    el = el && query(el) // transform el to dom
    if (el === document.body || el === document.documentElement) { // body or html not allowed to render el
        console.warn(`Do not mount Vue to <html> or <body> - mount to normal elements instead.`)
    }
    const options = this.$options

    // 这里需要用到 compileToFunctions 生成render函数
    // param： template
    if (!options.render) {
        let template = options.template
        if (template) {
            if (typeof template === 'string') {
                if (template.charAt(0) === '#') {
                    template = idToTemplate(template)
                }
            }
            // 这里以后还需要补dom片段的 if判断
            else {
                console.warn('无效的template设置')
                return this
            }
        } else if (el) { // template 没设置  而且  el有值的情况下
            template = getOuterHTML(el)
        }
        if (template) {
            // compileToFunctions 登场
            const { render, staticRenderFns } = compileToFunctions(template, {

            }, this)
            options.render = render
            options.staticRenderFns = staticRenderFns
        }
    }
    return mount.call(this, el)
}



export default Vue

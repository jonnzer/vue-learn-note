// renderMixin 需要用到  _renderProxy

const hasProxy = typeof Proxy !== 'undefined'

let initProxy

const hasHandler = { // renderProxy的has钩子 with语句触发
    has(target, key) {
        const has = key in target
        if (key in target.$data) {
            return
        }
        return has
    }
}

const getHandler = { // renderProxy的get钩子
    get (target, key) {
        if (key in target.$data) {
            return
        }
        return target[key]
    }
}

initProxy = function initProxy(vm) {
    if (hasProxy) {
        const options = vm.$options
        const handlers = options.render ? getHandler : hasHandler
        vm._renderProxy = new Proxy(vm, handlers)
    }
    else {
        vm._renderProxy = vm
    }
}

export { initProxy }
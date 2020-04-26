// renderMixin 需要用到  _renderProxy

const hasProxy = typeof Proxy !== 'undefined'

let initProxy

initProxy = function initProxy(vm) {
    vm._renderProxy = vm
}

export { initProxy }
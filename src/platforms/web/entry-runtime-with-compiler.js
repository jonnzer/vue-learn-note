/* @flow */

import Vue from './runtime/index'

const mount = Vue.prototype.$mount

Vue.prototype.$mount = function (el) {
    return mount.call(this, el)
}

export default Vue

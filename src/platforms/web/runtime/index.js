// /* @flow */
//
import Vue from 'core/index'

import { query } from 'web/util/index'

import { inBrowser } from 'core/util/index'

import { mountComponent } from 'core/instance/lifecycle'

import { noop } from "shared/util";

Vue.prototype.__patch__ = inBrowser ? patch : noop

// public mount method
Vue.prototype.$mount = function (el) {
    el = el && inBrowser ? query(el) : undefined
    return mountComponent(this, el)
}

export default Vue

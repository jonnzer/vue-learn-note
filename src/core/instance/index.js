import { initMixin } from './init'
import { renderMixin } from "./render";
import { lifecycleMixin } from "./lifecycle";

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
lifecycleMixin(Vue) // 定义vue.prototype._update 利用vnode
renderMixin(Vue) // 定义vue.prototype._render 创建Vnode

export default Vue

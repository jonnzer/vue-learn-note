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

  // import { initMixin } from './init'
  // import { stateMixin } from './state'
  // import { renderMixin } from './render'
  // import { eventsMixin } from './events'
  // import { lifecycleMixin } from './lifecycle'
  // import { warn } from '../util/index'
  //
  function Vue (options) {
    if (
      !(this instanceof Vue)
    ) {
      warn('Vue is a constructor and should be called with the `new` keyword');
    }
    // this._init(options)
  }

  // /*  */

  /*  */

  return Vue;

})));

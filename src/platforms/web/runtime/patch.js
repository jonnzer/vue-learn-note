/**
 * (1) patch vnode补丁  diff算法可能出于此处
 */

//
import * as nodeOps from 'web/runtime/node-ops'

import { createPatchFunction } from 'core/vdom/patch';

/**
 * @name createPatchFunction
 * @param nodeOps 封装了平台dom操作方法
 * @param modules 平台模块
 */
export const patch = createPatchFunction({ nodeOps })
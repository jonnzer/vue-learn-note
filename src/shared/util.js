
// 导出给util/index.js
export function isDef(v) {
    return v !== undefined && v !== null
}

// 空函数
export function noop(a,b,c) {};

// 返回相同值
export const identity = (_) => _;
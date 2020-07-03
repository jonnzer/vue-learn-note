// 生成编译器
// 给src/compiler/index.js 提供方法 createCompilerCreator

import { createCompileToFunctionFn } from "./to-function";

/**
 *
 * @param baseCompile : web平台编译函数
 * @inParam baseOptions: 柯里化 src/platforms/web/compiler/index.js 这时候已经传入
 * @return createCompiler : 返回createCompiler方法
 */
export function createCompilerCreator(baseCompile) {
    return function createCompiler(baseOptions) {
        function compile() {

        }
        return {
            compile,
            compileToFunctions: createCompileToFunctionFn(compile)
        }
    }
}
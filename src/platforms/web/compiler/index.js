
// entry-runtime-with-compiler.js
//  compileToFunctions( template,options,this )  留意下这个函数是在哪里设置参数的

import { baseOptions } from './options' // web render options

import { createCompiler } from 'compiler/index'

// 在 src/compiler/create-compiler.js 也可以看出来返回结果
const { compile, compileToFunctions } =  createCompiler(baseOptions)

export { compile, compileToFunctions }
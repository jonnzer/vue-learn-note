### vue源码解读

### 调试方式：

+  1. package.json：
```Javascript
    "scripts": {
        "build": "node scripts/build.js"
    },
```

+  2. \scripts\config.js
```Javascript
   'web-full-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue-test.js'),
  },
```

+  3. \src\platforms\web\entry-runtime-with-compiler.js
入口文件就在这，修改编译这个文件以及相关依赖的引入即可。

+  4. \demo\index.html 
预览这个网页即可。
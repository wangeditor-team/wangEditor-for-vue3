# wangEditor for Vue3 component

## 使用

1. 安装依赖
2. 调试
   - 本地调试，启动example页面
     - `yarn dev`
   - 打包
     - `yarn build`
   - 测试npm包
     - 需要先打包
     - 然后进行`yarn link`


## 目前存在的问题

1. 不支持用户自定义`defaultContent`
  > Uncaught TypeError: 'get' on proxy: property '0' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value (expected '#<Object>' but got '#<Object>')
  >
  > at Proxy.forEach (<anonymous>)
  >
  > at c (immer.esm.js:1)
  >
  > at m (immer.esm.js:1)
  >
  > at C (immer.esm.js:1)
  >
  > at _ (immer.esm.js:1)
  >
  > at j (immer.esm.js:1)
  >
  > at e5.t2.finishDraft (immer.esm.js:1)
  >
  > at Object.transform (index.es.js:3977)
  >
  > at apply (index.es.js:84)
  >
  > at t3.apply (index.mjs:29)

  
2. 需要用户手动引入样式文件`@import url(@wangeditor/editor-cattle/dist/css/style.css);`
# 开发文档

## 目录结构

```bash
├── __test__ # 测试文件
│
└── src
    ├── components
    │ ├── Editor.vue
    │ └── Toolbar.vue
    ├── utils
    ├── main.ts
    ├── index.ts
    └── App.vue   # 本地服务启动的example文件
```

## dev 本地开发

`yarn dev` 启动本地服务，使用 src/App.vue 文件

`yarn test` 单元测试，使用 test 目录

## build 构建

`yarn build` 构建代码，使用 src 目录。

## release 发布

`yarn release` 可触发 github actions 并发布 npm

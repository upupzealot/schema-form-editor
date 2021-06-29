# schema-form-maker
## 安装依赖
用了 npm v6.9.0 以上的 [package-aliases](https://github.com/npm/rfcs/blob/latest/implemented/0001-package-aliases.md#rationale-and-alternatives) 特性安装所依赖库的不同版本，并进行切换，暂时不支持 cnpm
```
npm install
```
## 安装错误
```
Vue packages version mismatch
```
是由于 vue 和 vue-template-compiler 两个依赖的版本不一致导致的，检查 node_modules 中 vue-template-compiler 和 vue 的版本是否一致，否则重新安装即可

## 运行表单编辑器
### Run with vue(2.x) & element-ui & ant-design-vue(1.x)
```
npm run dev
```
### Run with vue(3.x) & element-plus & ant-design-vue(2.x)
```
npm run dev3
```

## 启动本地服务器
```
# 需要先进入 server 目录安装依赖
npm run serve
```

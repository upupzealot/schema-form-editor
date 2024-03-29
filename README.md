# schema-form-maker
schema-form-maker 是一个基于 vue 编写的可视化表单编辑器。
<!-- ![编辑器截屏](/public/readme/screenshot.png | width=640) -->
文档详见 [wiki](https://github.com/upupzealot/schema-form-editor/wiki) 相关章节
[安装依赖](https://github.com/upupzealot/schema-form-editor/wiki/%E5%AE%89%E8%A3%85) | [运行编辑器](https://github.com/upupzealot/schema-form-editor/wiki/%E8%BF%90%E8%A1%8C) | [搭建表单](https://github.com/upupzealot/schema-form-editor/wiki/%E8%A1%A8%E5%8D%95%E6%90%AD%E5%BB%BA) | 导出 schema | 渲染表单

## 安装依赖
使用原生 npm 进行安装，**暂时不支持 cnpm**
```
npm install
```
(详情参考 [安装](https://github.com/upupzealot/schema-form-editor/wiki/%E5%AE%89%E8%A3%85))

## 运行编辑器
完成安装后，执行
```
npm run dev
```
运行表单编辑器，启动完成后打开 `http://localhost:8080/` 访问。

(详情参考 [运行](https://github.com/upupzealot/schema-form-editor/wiki/%E8%BF%90%E8%A1%8C))

## 搭建表单
表单编辑器左中右共分为三个区域：
<!-- ![编辑器视图分区](/public/readme/editor-view.png | width=640) -->
<img src="/public/readme/editor-view.png" width="640px" alt="编辑器视图分区" />  

#### 组件栏
视图的最左侧是【组件栏】，可利用拖拽将其中的组件加入中间【搭建区】的表单中。
#### 搭建区
视图的中间是【搭建区】，这里展示了当前正在编辑的表单。  
单击选中其中的某一表单项后，可在右侧的【配置菜单】，并对其进行编辑。  
在编辑过程中可以随时按下 <kbd>ctrl</kbd>+<kbd>s</kbd> 或 <kbd>cmd</kbd>+<kbd>s</kbd> 进行保存。

(详情参考 [表单搭建-搭建区](https://github.com/upupzealot/schema-form-editor/wiki/%E6%90%AD%E5%BB%BA%E5%8C%BA))
#### 配置菜单
视图的最右侧是【配置菜单】，可对【搭建区】已选中的表单项进行编辑。

## 导出 schema
完成表单的搭建后，在搭建区的最下方，点击【结构】按钮便可以在弹出的对话框中查看表单的 schema。  
在 schema 对话框的右上角，有【复制】和【下载】两个按钮，可用于导出 schema。
<!-- ![导出 schema](/public/readme/export-schema.png | width="640") -->
<img src="/public/readme/export-schema.png" width="640px" alt="导出 schema" />

## 渲染表单
导出 schema 后，便可以在自己的项目中借助 [schema-form-render](http://www.npmjs.com/package/schema-form-render) 组件，将表单重新渲染出来。

示例代码：
```vue
<template>
  ...
    <!-- DeviceSchema 为渲染表单需要的 schema -->
    <!-- device 为表单数据 -->
    <SchemaFormRender
      :schema="DeviceSchema"
      :data="device"
    />
    <el-button @click="updateDevice">
      提交
    </el-button>
  ...
</template>
<script>
...
export default {
  ...
  methods: {
    async updateDevice() {
      // 用户操作表单后 this.device 的数据会实时更新
      // 这里可以直接通过 this.device 访问到表单中的数据
      await axios.put(`http://api.com/device/${this.device.id}`, this.device);
      this.$message.success('保存成功');
    }
  }
}
</script>
```

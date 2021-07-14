# schema-form-maker
schema-form-maker 是一个基于 vue 编写的可视化表单编辑器。
![编辑器截屏](/public/readme/screenshot.png)

## 安装依赖
用了 npm v6.9.0 以上的 [package-aliases](https://github.com/npm/rfcs/blob/latest/implemented/0001-package-aliases.md#rationale-and-alternatives) 特性安装所依赖库的不同版本，并进行切换，暂时不支持 cnpm
```
npm install
```
### 常见安装错误
```
Vue packages version mismatch
```
是由于 vue 和 vue-template-compiler 两个依赖的版本不一致导致的，检查 node_modules 中 vue-template-compiler 和 vue 的版本是否一致，否则重新安装即可。

## 运行表单编辑器
#### 以 vue(2.x) 环境运行
```
npm run dev
```
支持的 ui-kit: 
- element-ui
- ant-design-vue(1.x)

#### 以 vue(3.x) 环境运行 & element-plus/ant-design-vue(2.x)
```
npm run dev3
```
支持的 ui-kit: 
- element-plus
- ant-design-vue(2.x)

启动后打开 `http://localhost:8080/` 访问表单编辑器。

## 使用表单编辑器
表单编辑器左中右共分为三个区域：
- 组件栏
- 搭建区
- 配置菜单
![编辑器视图分区](/public/readme/editor-view.png)
#### 组件栏
视图的最左侧是【组件栏】，这里罗列了所有可用的表单组件。
将组件栏中的表单项拖拽进入位于中间的【搭建区】，便可将对应组件插入到表单的指定位置。
#### 搭建区
视图的中间是【搭建区】，这里展示了当前正在编辑的表单。
单击其中的某一表单项，可以将其选中，然后可在右侧的【配置菜单】中查看该的配置详情，并对其进行编辑。
在编辑过程中可以随时按下 <kbd>ctrl</kbd>+<kbd>s</kbd> 或 <kbd>cmd</kbd>+<kbd>s</kbd> 进行保存。
#### 配置菜单
视图的最右侧是【配置菜单】，这里展示了【搭建区】中选中项的详情配置项。
在【配置菜单】中，可对已选中的表单项进行编辑，所带来的改变会实时反应到】搭建区】中。
## 导出 schema
完成表单的搭建和配置后，在搭建区的最下方，点击【结构】按钮便可以在弹出的对话框中查看表单的 schema。
在 schema 对话框的右上角，有【复制】和【下载】两个按钮，可用于导出 schema。
![导出 schema](/public/readme/export-schema.png)
## 渲染表单
导出 schema 后，便可以在自己的项目中借助 [schema-form-render](http://www.npmjs.com/package/schema-form-render) 组件，将表单重新渲染出来。
```vue
<template>
  ...
    <!-- DeviceSchema 为渲染表单需要的 schema -->
    <!-- device 为表单数据 -->
    <FormRender
      :schema="DeviceSchema"
      :data="device"
    />
    <el-button @click="updateDevice">
      提交
    </el-button>
  ...
</template>

<script>
import FormRender from 'schema-form-render'
import DeviceSchema from './device.schema.json'

export default {
  components: {
    FormRender,
  },
  data() {
    return {
      DeviceSchema,
      device: {},
    }
  },
  async created() {
    // 拉取 "device" 数据，并回填到表单中
    this.device = await getDevice();
  },
  methods: {
    getDevice() {
      return axios.get('http://api.com/device/1');
    },
    async updateDevice() {
      // 用户操作表单后 this.device 的数据会实时更新
      // 这里可以直接通过 this.device 访问到表单中的数据
      await axios.put('http://api.com/device/1', this.device);
      this.$message.success('保存成功');
    }
  }
}
</script>
```

<!-- ### 启动本地服务器
启动本地监听服务后，切换到本地服务模式（导航条左上角按钮切换），可直接编辑指定目录中的所有 schema 文件
#### 安装 server 依赖
进入 server 目录安装依赖
```
cd server
npm install
```
#### Serve with vue(2.x) & element-ui/ant-design-vue(1.x)
```
npm run serve
```
#### Serve with vue(3.x) & element-plus/ant-design-vue(2.x)
```
npm run serve3
```
-->

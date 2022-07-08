<template>
  <el-row>
    <el-col class="item-editor">
      <!-- 表单属性 -->
      <el-divider content-position="left">
        <i
          v-if="isVue2"
          :class="{ 'el-icon-circle-plus-outline': !formConfOpen, 'el-icon-remove-outline': formConfOpen }"
          @click="formConfOpen = !formConfOpen"
        />
        <el-icon
          v-else-if="formConfOpen"
          :size="14"
        >
          <Remove
            @click="formConfOpen = !formConfOpen"
          />
        </el-icon>
        <el-icon
          v-else-if="!formConfOpen"
          :size="14"
        >
          <CirclePlus
            @click="formConfOpen = !formConfOpen"
          />
        </el-icon>
        表单属性
      </el-divider>
      <el-collapse-transition>
        <div
          v-show="formConfOpen"
          class="field-group"
        >
          <FormConfEditor />
        </div>
      </el-collapse-transition>

      <!-- 表单项编辑器 -->
      <component
        :is="fallbackComponent(`schema-${field.type}`)"
        v-if="field.type"
        :ui-kit="uiKit"
      />
    </el-col>
  </el-row>
</template>

<style>
.item-editor .divider-wrap {
  padding: 1px;
}
.item-editor .el-divider__text {
  color: #ccc;
}
.el-divider .el-divider__text i {
  cursor: pointer;
  margin-right: 5px;
}
.el-divider .el-divider__text i:hover {
  color: #409EFF;
}
</style>

<script>
import FormConfEditor from '@/ui-kit/element-ui/form-conf-editor';
import isVue2 from '@/ui-kit/common/util-is-vue2';

import { SchemaItems as ElementItems } from '@/ui-kit/element-ui/index'
import { SchemaItems as AntDesignItems } from '@/ui-kit/ant-design/index'
const uiKit = localStorage.getItem('ui-kit');
let SchemaItems = [];
if(uiKit === 'element-ui') {
  SchemaItems = ElementItems;
}
if(uiKit === 'ant-design') {
  SchemaItems = AntDesignItems;
}
const ItemMap = _(SchemaItems)
  .keyBy('type')
  .mapKeys((v, k) => {
    return `schema-${k}`
  })
  .value();

const spanValues = Array.from({ length: 23 }, (v, i) => i + 1);

export default {
  components: {
    FormConfEditor,
    ...ItemMap,
  },
  data() {
    return {
      isVue2,
      uiKit,
      formConfOpen: false,
      layoutOpen: false,
      basicOpen: true,
      validOpen: true,
    }
  },
  computed: {
    field() {
      return this.$store.state.activeField;
    },
    form() {
      return this.$store.state.activeForm;
    },
    span: {
      get() {
        return this.field.span;
      },
      set(n) {
        const value = Number(n);
        this.$set(this.field, 'span', spanValues.includes(value) ? value : undefined);
      }
    },
    fieldName() {
      // 用这个 computed 给 watch 使用，同时监控 id 和 name
      return {
        id: this.field.id,
        name: this.field.name,
      }
    }
  },
  watch: {
    fieldName: {
      handler({ id: newId, name: newName}, { id: oldId, name: oldName}) {
        // id 的改变是切换字段触发的
        // 只有当 id 不变时，name 的变化才触发 updateFieldName
        if(newId === oldId && newName && oldName && newName !== oldName) {
          this.$store.commit(`${this.form.formKey}/updateFieldName`, {
            newName,
            oldName,
          });
        }
      }
    }
  },
  methods: {
    fallbackComponent(type) {
      return !!ItemMap[type] ? type : 'div';
    },
  }
};
</script>

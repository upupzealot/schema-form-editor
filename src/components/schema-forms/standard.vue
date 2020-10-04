<template>
  <!-- 表单项编辑器 -->
  <el-form label-width="80px">
    <!-- 布局 -->
    <div class="divider-wrap">
      <el-divider content-position="left">
        <i
          :class="{ 'el-icon-circle-plus-outline': !layoutOpen, 'el-icon-remove-outline': layoutOpen }"
          @click="layoutOpen = !layoutOpen"
        />
        布局
      </el-divider>
    </div>
    <el-collapse-transition>
      <div
        v-show="layoutOpen"
        class="field-group"
      >
        <el-form-item label="栅格数">
          <el-input
            v-model="span"
            placeholder="1~24 之间，24 不用填"
          />
        </el-form-item>
        <slot name="layout" />
      </div>
    </el-collapse-transition>

    <!-- 表单项属性 -->
    <div class="divider-wrap">
      <el-divider content-position="left">
        <i
          :class="{ 'el-icon-circle-plus-outline': !basicOpen, 'el-icon-remove-outline': basicOpen }"
          @click="basicOpen = !basicOpen"
        />
        表单项属性
      </el-divider>
    </div>
    <el-collapse-transition>
      <div
        v-show="basicOpen"
        class="field-group"
      >
        <el-form-item label="Key">
          <el-input v-model="field.name" />
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="field.label" />
        </el-form-item>
        <slot name="basic" />
      </div>
    </el-collapse-transition>

    <div class="divider-wrap">
      <el-divider content-position="left">
        <i
          :class="{ 'el-icon-circle-plus-outline': !validOpen, 'el-icon-remove-outline': validOpen }"
          @click="validOpen = !validOpen"
        />
        校验
      </el-divider>
    </div>
    <el-collapse-transition>
      <div
        v-show="validOpen"
        class="field-group"
      >
        <RequiredRule />
        <slot name="valid" />
      </div>
    </el-collapse-transition>
  </el-form>
</template>

<style scoped>
.field-group .el-form-item:last-child {
  margin: 0;
}
</style>

<script>
import RequiredRule from '@/components/schema-forms/validate-rules/required'

const spanValues = Array.from({ length: 23 }, (v, i) => i + 1);

export default {
  components: {
    RequiredRule,
  },
  data() {
    return {
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
    span: {
      get() {
        return this.field.span;
      },
      set(n) {
        const value = Number(n);
        this.$set(this.field, 'span', spanValues.includes(value) ? value : undefined);
      }
    }
  },
};
</script>

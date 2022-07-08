<template>
  <!-- 表单项编辑器 -->
  <el-form label-width="80px">
    <!-- 布局 -->
    <div v-if="config.hasLayout !== false">
      <div class="divider-wrap">
        <el-divider content-position="left">
          <i
            v-if="isVue2"
            :class="{ 'el-icon-circle-plus-outline': !layoutOpen, 'el-icon-remove-outline': layoutOpen }"
            @click="layoutOpen = !layoutOpen"
          />
          <el-icon
            v-else-if="!layoutOpen"
            :size="14"
          >
            <CirclePlus
              @click="layoutOpen = !layoutOpen"
            />
          </el-icon>
          <el-icon
            v-else-if="layoutOpen"
            :size="14"
          >
            <Remove
              @click="layoutOpen = !layoutOpen"
            />
          </el-icon>
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
    </div>

    <!-- 表单项属性 -->
    <div v-if="config.hasBasic !== false">
      <div class="divider-wrap">
        <el-divider content-position="left">
          <i
            v-if="isVue2"
            :class="{ 'el-icon-circle-plus-outline': !basicOpen, 'el-icon-remove-outline': basicOpen }"
            @click="basicOpen = !basicOpen"
          />
          <el-icon
            v-else-if="!basicOpen"
            :size="14"
          >
            <CirclePlus
              @click="basicOpen = !basicOpen"
            />
          </el-icon>
          <el-icon
            v-else-if="basicOpen"
            :size="14"
          >
            <Remove
              @click="basicOpen = !basicOpen"
            />
          </el-icon>
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
          <el-form-item
            v-if="config.hasDesc !== false"
            label="字段描述"
            prop="desc"
          >
            <el-input
              v-model="desc"
              type="textarea"
            />
          </el-form-item>
          <el-row style="margin-top: -15px; margin-bottom: 10px;">
            <el-col :span="12">
              <el-form-item label="是否激活">
                <el-checkbox v-model="activated" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否显示">
                <el-checkbox v-model="visible" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否只读">
                <el-checkbox v-model="readonly" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否禁用">
                <el-checkbox v-model="disabled" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="在表格中">
                <el-checkbox v-model="inTable" />
              </el-form-item>
            </el-col>
          </el-row>
          <slot name="basic" />
        </div>
      </el-collapse-transition>
    </div>

    <!-- 校验规则 -->
    <div v-if="config.hasValid !== false">
      <div class="divider-wrap">
        <el-divider content-position="left">
          <i
            v-if="isVue2"
            :class="{ 'el-icon-circle-plus-outline': !validOpen, 'el-icon-remove-outline': validOpen }"
            @click="validOpen = !validOpen"
          />
          <el-icon
            v-else-if="!validOpen"
            :size="14"
          >
            <CirclePlus
              @click="validOpen = !validOpen"
            />
          </el-icon>
          <el-icon
            v-else-if="validOpen"
            :size="14"
          >
            <Remove
              @click="validOpen = !validOpen"
            />
          </el-icon>
          校验
        </el-divider>
      </div>
      <el-collapse-transition>
        <div
          v-show="validOpen"
          class="field-group"
        >
          <RequiredRule style="margin-left: 40px;" />
          <slot name="valid" />
        </div>
      </el-collapse-transition>
    </div>

    <!-- 表单联动 -->
    <div v-if="config.hasEffect !== false">
      <div class="divider-wrap">
        <el-divider content-position="left">
          <i
            v-if="isVue2"
            :class="{ 'el-icon-circle-plus-outline': !effectOpen, 'el-icon-remove-outline': effectOpen }"
            @click="effectOpen = !effectOpen"
          />
          <el-icon
            v-else-if="!effectOpen"
            :size="14"
          >
            <CirclePlus
              @click="effectOpen = !effectOpen"
            />
          </el-icon>
          <el-icon
            v-else-if="effectOpen"
            :size="14"
          >
            <Remove
              @click="effectOpen = !effectOpen"
            />
          </el-icon>
          联动
        </el-divider>
      </div>
      <el-collapse-transition>
        <div
          v-show="effectOpen"
          class="field-group"
        >
          <Effects />
        </div>
      </el-collapse-transition>
    </div>
  </el-form>
</template>

<style scoped>
.field-group .el-form-item:last-child {
  margin: 0;
}
</style>

<script>
import isVue2 from '@/ui-kit/common/util-is-vue2';
import RequiredRule from './common/validate-rules/required'
import Effects from './common/effects'

const spanValues = Array.from({ length: 23 }, (v, i) => i + 1);

export default {
  components: {
    RequiredRule,
    Effects,
  },
  props: {
    config: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      isVue2,
      formConfOpen: false,
      layoutOpen: false,
      basicOpen: true,
      validOpen: false,
      effectOpen: false,
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
    },
    desc: {
      get() {
        return this.field.desc || '';
      },
      set(val) {
        this.$set(this.field, 'desc', val || undefined);
      }
    },
    activated: {
      get() {
        return this.field.activated !== false;
      },
      set(val) {
        this.$set(this.field, 'activated', val && undefined);
      }
    },
    visible: {
      get() {
        return this.field.visible !== false;
      },
      set(val) {
        this.$set(this.field, 'visible', val && undefined);
      }
    },
    readonly: {
      get() {
        return !!this.field.readonly;
      },
      set(val) {
        this.$set(this.field, 'readonly', val || undefined);
      }
    },
    disabled: {
      get() {
        return !!this.field.disabled;
      },
      set(val) {
        this.$set(this.field, 'disabled', val || undefined);
      }
    },
    inTable: {
      get() {
        return this.field.inTable !== false;
      },
      set(val) {
        this.$set(this.field, 'inTable', val && undefined);
      }
    },
  },
};
</script>

<template>
  <component
    :is="formItemIs"
    v-if="activated"
    v-show="visible"
    :[formItemPropName]="field.name"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :colon="false"
    :class="{'form-item': true, 'readonly': readonly}"
    :style="{
      marginBottom: colMarginY,
      display: 'flex',
      flexDirection: isLabelTop ? 'column' : '',
    }"
    :sfr-f="field.name"
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>
    <a-upload
      action=""
      :before-upload="() => false" 
      :multiple="false"
      :limit="1"
      :accept="field.accept"
      @change="onChange"
      :show-upload-list="false"
      class="upload-item"
    >
      <a-input
        v-model="filename"
        v-model:value="filename"
        :[readonlyProp]="true"
        :clearable="true"
      />
      <div
        v-if="filename"
        class="clear-btn"
        @click.stop="onClear"
      >
        <component
          :is="iconComponent"
          type="close-circle"
          theme="filled"
          style="font-size: 12px;"
        />
      </div>
    </a-upload>
  </component>
</template>

<style>
.upload-item .ant-upload.ant-upload-select-text {
  width: 100%;
}
.upload-item .clear-btn {
  position: absolute;
  top: -3px;
  right: 3px;
  text-align: center;
  color: rgba(0, 0, 0, 0.25);
  display: block;
  cursor: pointer;
}
.upload-item:hover .clear-btn {
  color: rgba(0, 0, 0, 0.45);
}
</style>

<script>
import isVue2 from 'vue';
import { CloseCircle } from '@ant-design/icons-vue'

import formItemMixin from '../../common/form-item/mixin'

export default {
  mixins: [formItemMixin],
  computed: {
    iconComponent() {
      return !!isVue2 ? 'a-icon' : CloseCircle;
    },
    filename() {
      const file = this.data[this.field.name];
      return file && file.name;
    }
  },
  methods: {
    onBeforeUpload(file) {
      this.$set(this.data, this.field.name, file);
      return false;
    },
    onChange({ file }) {
      this.$set(this.data, this.field.name, file);
      return false;
    },
    onClear() {
      this.$set(this.data, this.field.name, undefined);
    }
  }
};
</script>

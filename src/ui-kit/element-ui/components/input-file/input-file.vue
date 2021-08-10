<template>
  <el-form-item
    v-if="activated"
    v-show="visible"
    :label="field.label"
    :prop="field.name"
    :class="{'form-item': true, 'readonly': readonly}"
    :style="{ marginBottom: colMarginY }"
    :sfr-f="field.name"
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>
    <el-upload
      ref="uploader"
      action=""
      :auto-upload="false" 
      :multiple="false"
      :limit="1"
      :accept="field.accept"
      :on-change="onChange"
      :on-exceed="onExceed" 
      :show-file-list="false"
      class="upload-item"
    >
      <el-input
        v-model="filename"
        :readonly="true"
        :clearable="true"
      />
      <div
        v-if="filename"
        class="clear-btn"
        @click.stop="onClear"
      >
        <i class="el-icon-circle-close" style="color: #DCDFE6" />
      </div>
    </el-upload>
  </el-form-item>
</template>

<style>
.upload-item .el-upload.el-upload--text {
  width: 100%;
}
.upload-item .clear-btn {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 0 10px 0 5px;
  text-align: center;
  color: #DCDFE6;
  display: none;
}
.upload-item:hover .clear-btn {
  display: block;
}
</style>

<script>
import formItemMixin from '../../common/form-item/mixin'

export default {
  mixins: [formItemMixin],
  computed: {
    file() {
      return this.data[this.field.name];
    },
    filename() {
      return this.file && this.file.name;
    }
  },
  watch: {
    file(newVal, oldVal) {
      if(!!oldVal && !newVal) {
        this.$refs['uploader'].clearFiles();
      }
    }
  },
  methods: {
    onChange(elFile) {
      this.$set(this.data, this.field.name, elFile.raw);
    },
    onExceed([elFile]) {
      this.$set(this.data, this.field.name, elFile);
    },
    onClear() {
      this.$set(this.data, this.field.name, undefined);
    }
  }
};
</script>

<template>
  <el-form-item
    v-if="activated"
    v-show="visible"
    :label="field.label"
    :prop="field.name"
    :class="{'form-item': true, 'readonly': readonly}"
    style="margin-bottom: 0"
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>
    <el-upload
      action=""
      :auto-upload="false" 
	    :multiple="false" :limit="1"
	    :on-change="onChange"
	    :on-exceed="onExceed" 
	    :show-file-list="false"
      class="upload-item"
    >
      <el-input
        v-model="text"
        :readonly="true"
        :clearable="true"
      >
        <template v-slot:append>
          <el-button @click.stop="onClear">
            <i class="el-icon-circle-close" />
          </el-button>
        </template>
      </el-input>
    </el-upload>
  </el-form-item>
</template>

<style>
.upload-item .el-upload.el-upload--text {
  width: 100%;
}
</style>

<script>
import formItemMixin from '../../common/form-item/mixin'

export default {
  mixins: [formItemMixin],
  data() {
    return {
      text: '',
    }
  },
  methods: {
    onChange(elFile) {
      this.text = elFile.name;
      this.$set(this.data, this.field.name, elFile.raw);
    },
    onExceed([elFile]) {
      this.text = elFile.name;
      this.$set(this.data, this.field.name, elFile.raw);
    },
    onClear() {
      this.text = '';
      this.$set(this.data, this.field.name, undefined);
    }
  }
};
</script>

<template>
  <StandardForm>
    <template v-slot:basic>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="开-键">
            <el-input v-model="field.activeText" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开-值">
            <el-input v-model="field.activeValue" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关-键">
            <el-input v-model="field.inactiveText" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关-值">
            <el-input v-model="field.inactiveValue" />
          </el-form-item>
        </el-col>
      </el-row>
    </template>
  </StandardForm>
</template>

<script>
import schemaItemMixin from '@/framework/schema-item/mixin';

export default {
  type: 'switch',
  mixins: [schemaItemMixin],
};
</script>

<template>
  <StandardForm>
    <template v-slot:basic>
      <el-form-item
        label="占位符"
        prop="placeholder"
      >
        <el-input
          v-model="field.placeholder"
        />
      </el-form-item>
      <el-form-item
        label="字段映射"
        prop="mapValue">
        <el-form label-position="right" label-width="60px">
          <el-form-item
            label="经度"
            prop="lng"
            style="margin-bottom: 10px;">
            <el-row>
              <el-col :span="6">
                <el-switch v-model="field.mapLng" />
              </el-col>
              <el-col :span="18">
                <el-input v-model="field.lngKey" placeholder="longitude" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item
            label="纬度"
            prop="lat"
            style="margin-bottom: 10px;">
            <el-row>
              <el-col :span="6">
                <el-switch v-model="field.mapLat" />
              </el-col>
              <el-col :span="18">
                <el-input v-model="field.latKey" placeholder="latitude" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item
            label="省"
            prop="province"
            style="margin-bottom: 10px;">
            <el-row>
              <el-col :span="6">
                <el-switch v-model="field.mapProvince" />
              </el-col>
              <el-col :span="18">
                <el-input v-model="field.provinceKey" placeholder="province" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item
            label="市"
            prop="city"
            style="margin-bottom: 10px;">
            <el-row>
              <el-col :span="6">
                <el-switch v-model="field.mapCity" />
              </el-col>
              <el-col :span="18">
                <el-input v-model="field.cityKey" placeholder="city" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item
            label="区"
            prop="district"
            style="margin-bottom: 10px;">
            <el-row>
              <el-col :span="6">
                <el-switch v-model="field.mapDistrict" />
              </el-col>
              <el-col :span="18">
                <el-input v-model="field.districtKey" placeholder="district" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item
            label="地址"
            prop="address"
            style="margin-bottom: 10px;">
            <el-row>
              <el-col :span="6">
                <el-switch v-model="field.mapAddress" />
              </el-col>
              <el-col :span="18">
                <el-input v-model="field.addressKey" placeholder="address" />
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-form-item>
    </template>
  </StandardForm>
</template>

<script>
import schemaItemMixin from '@/ui-kit/common/schema-item/mixin';

export default {
  type: 'china-location',
  mixins: [schemaItemMixin],
};
</script>

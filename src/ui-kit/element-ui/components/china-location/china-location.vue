<template>
  <el-form-item
    v-if="activated"
    v-show="visible"
    :label="field.label"
    :prop="field.name"
    :class="{'form-item': true, 'readonly': readonly}"
    :style="{ marginBottom: colMarginY }"
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>
    <!-- <el-input
      v-model="valueText"
      type="textarea"
      :rows="2"
      :autosize="{ minRows: 2, maxRows: 2}"
      resize="none"
      :readonly="true"
      @focus="show"
      @click.native="show"
      @click="show"
      :placeholder="field.placeholder || '地图选点'"
      :clearable="field.clearable"
      class="example-component"
    /> -->
    <el-button
      :style="{ width: fullWidth ? '100%' : '' }"
      @click="show"
    >
      <i class="el-icon-map-location" />
      {{ btnLabel }}
    </el-button>
    <el-dialog
      v-model="dialogVisible"
      :visible.sync="dialogVisible"
      width="600px"
      :append-to-body="true"
      @opened="onShow"
      @close="popoverVisible = false"
    >
      <div style="position: relative;">
        <div
          ref="mapRoot"
          style="width: 100%; height: 240px;"
        />
        <el-popover
          v-model="searchPopoverVisible"
          placement="bottom-start"
          width="340"
          trigger="manual"
          :visible.sync="searchPopoverVisible"
        >
          <template v-slot:reference>
            <el-input
              ref="searchInput"
              v-model="search"
              size="mini"
              prefix-icon="el-icon-search"
              clearable
              style="position: absolute; top: 10px; left: 10px; width: 200px;"
              @focus="popoverVisible = false"
            />
          </template>
          <div style="height: 120px; overflow-y: overlay;">
            <div
              v-for="location in searchLocations"
              :key="location.uid"
              class="location-item"
              @click="pickLocation(location)"
            >
              <div class="title">
                {{ location.title }}
              </div>
              <div class="address">
                {{ location.shortAddress }}
              </div>
            </div>
          </div>
        </el-popover>
        <el-popover
          v-model="popoverVisible"
          v-model:visible="popoverVisible"
          placement="top"
          title="附近地点"
          width="340"
          trigger="manual"
        >
          <template v-slot:reference>
            <div
              style="
                position: absolute;
                left: 50%; margin-left: -10px;
                top: 160px; margin-top: -20px;
                height: 20px; width: 20px;
                font-size: 20px;
                color: #F56C6C;"
            >
              <i class="el-icon-location" />
            </div>
          </template>
          <div style="height: 120px; overflow-y: overlay;">
            <div
              v-for="location in popoverLocations"
              :key="location.uid"
              class="location-item"
              @click="pickLocation(location)"
            >
              <div class="title">
                {{ location.title }}
              </div>
              <div class="address">
                {{ location.shortAddress }}
              </div>
            </div>
          </div>
        </el-popover>
      </div>
      <el-form
        label-position="right"
        label-width="40px"
        class="china-location-form"
      >
        <el-row :gutter="15">
          <el-col
            v-if="mapLng"
            :span="12"
          >
            <el-form-item
              label="经度"
              style="margin-bottom: 0;"
            >
              <el-input
                v-model="lng"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col
            v-if="mapLat"
            :span="12"
          >
            <el-form-item
              label="纬度"
              style="margin-bottom: 0;"
            >
              <el-input v-model="lat" />
            </el-form-item>
          </el-col>
          <el-col
            v-if="mapProvince"
            :span="8"
          >
            <el-form-item
              label="省"
              style="margin-bottom: 0;"
            >
              <el-input v-model="province" />
            </el-form-item>
          </el-col>
          <el-col
            v-if="mapCity"
            :span="8"
          >
            <el-form-item
              label="市"
              style="margin-bottom: 0;"
            >
              <el-input v-model="city" />
            </el-form-item>
          </el-col>
          <el-col
            v-if="mapDistrict"
            :span="8"
          >
            <el-form-item
              label="区"
              style="margin-bottom: 0;"
            >
              <el-input v-model="district" />
            </el-form-item>
          </el-col>
          <el-col
            v-if="mapAddress"
            :span="24"
          >
            <el-form-item
              label="地址"
              style="margin-bottom: 0;"
            >
              <el-input v-model="address" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-image :src="imgSrc" style="width: 100px; height: 62px; margin-top: 15px;" /> -->
      </el-form>
      <template v-slot:footer>
        <div style="height: 40px;">
          <el-button
            type="primary"
            style="float: right; margin-left: 15px;"
            @click="onPick"
          >
            确定
          </el-button>
          <el-button
            style="float: right;"
            @click="dialogVisible = false"
          >
            取消
          </el-button>
        </div>
      </template>
    </el-dialog>
  </el-form-item>
</template>

<style scoped lang="less">
/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #f9f9f9;
}
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #efefef;
}
.china-location-form .el-form-item {
  margin-top: 15px;
}
.location-item {
  height: 50px;
  padding: 8px 0;
  margin-right: 20px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  &:last-of-type {
    border-bottom: none;
  }
  &:hover {
    background-color: #ecf5ff;
  }

  .title {
    height: 18px;
    line-height: 18px;
    color: #777;
    text-overflow: ellipsis;
    overflow: hidden; 
    white-space: nowrap;
  }
  .address {
    margin-top: 4px;
    height: 12px;
    line-height: 12px;
    font-size: 12px;
    color: #aaa;
    text-overflow: ellipsis;
    overflow: hidden; 
    white-space: nowrap;
  }
}
</style>

<script>
import formItemMixin from '../../common/form-item/mixin'

export default {
  mixins: [formItemMixin],
  data() {
    return {
      valueText: '',
      dialogVisible: false,
      scriptLoaded: false,
      mounted: false,
      showed: false,
      map: null,
      popoverVisible: false,
      popoverLocations: [],
      search: '',
      searchLocations: [],
      searchPopoverVisible: false,
      lng: '',
      lat: '',
      province: '',
      city: '',
      district: '',
      address: '',
      // imgSrc: ''
    }
  },
  computed: {
    ready() {
      return this.scriptLoaded && this.mounted && this.showed;
    },
    btnLabel() {
      return this.field.btnLabel || '地图选点';
    },
    fullWidth() {
      return !!this.field.fullWidth;
    },
    mapLng() {
      return !!this.field.mapLng;
    },
    lngKey() {
      return this.field.lngKey || 'longitude';
    },
    mapLat() {
      return !!this.field.mapLat;
    },
    latKey() {
      return this.field.latKey || 'latitude'
    },
    mapProvince() {
      return !!this.field.mapProvince;
    },
    provinceKey() {
      return this.field.provinceKey || 'province'
    },
    mapCity() {
      return !!this.field.mapCity;
    },
    cityKey() {
      return this.field.cityKey || 'city'
    },
    mapDistrict() {
      return !!this.field.mapDistrict;
    },
    districtKey() {
      return this.field.districtKey || 'district'
    },
    mapAddress() {
      return !!this.field.mapAddress;
    },
    addressKey() {
      return this.field.addressKey || 'address'
    },
  },
  watch: {
    ready() {
      const map = new BMap.Map(this.$refs.mapRoot, {
        enableMapClick: false,
      });
      this.map = map;
      map.setDefaultCursor('pointer');
      map.centerAndZoom(new BMap.Point(120.19, 30.26), 15);
      map.enableScrollWheelZoom();
      map.addEventListener('click', e => {
        this.popoverVisible = false;
        const { point } = e;
        this.pickPoint(point);
      });
    },
    search(val) {
      if(val) {
        const localSearch = new BMap.LocalSearch(this.map, {
          pageCapacity: 6,
        });
        localSearch.setSearchCompleteCallback(res => {
          const suggestions = [];
          const { province, city } = res;
          const num = res.getCurrentNumPois();
          for(let i = 0; i < num; i++) {
            const point = res.getPoi(i);
            suggestions.push(this.makeShortAddress(point, province, city));
          }
          
          this.searchLocations = suggestions;
          this.searchPopoverVisible = true;
        });
        localSearch.search(val);
      }
    }
  },
  created() {
    const ak = this.config.baiduAk;
    if(!ak) {
      return console.error('未找到百度地图 appkey，请在 config.baiduAk 中设置');
    }
    const src = `http://api.map.baidu.com/api?v=2.0&ak=${ak}&callback=BMapInit`;
    if (!document.querySelector('script[src="' + src + '"]')) {
      const script = document.createElement('script');
      script.src = src;
      window.BMapInit = () => {
       this.scriptLoaded = true;
      }
      document.head.appendChild(script);
    } else {
      this.scriptLoaded = true;
    }
  },
  mounted() {
    this.mounted = true;
  },
  methods: {
    show() {
      this.dialogVisible = true;
    },
    onShow() {
      this.showed = true;
    },
    onPick() {
      if(this.mapLng) {
        this.$set(this.data, this.lngKey, this.lng);
      }
      if(this.mapLat) {
        this.$set(this.data, this.latKey, this.lat);
      }
      if(this.mapProvince) {
        this.$set(this.data, this.provinceKey, this.province);
      }
      if(this.mapCity) {
        this.$set(this.data, this.cityKey, this.city);
      }
      if(this.mapDistrict) {
        this.$set(this.data, this.districtKey, this.district);
      }
      if(this.mapAddress) {
        this.$set(this.data, this.addressKey, this.address);
      }
      
      this.dialogVisible = false;
    },
    pickPoint(point) {
      this.$refs.searchInput.blur();
      this.lng = point.lng;
      this.lat = point.lat;
      // const ak = '*******';
      // this.imgSrc = `http://api.map.baidu.com/panorama/v2?ak=${ak}&width=100&height=62&location=${this.lng},${this.lat}&fov=180`
      const geocoder = new BMap.Geocoder();
      geocoder.getLocation(point, res => {
        this.address = res.address;
        const { province, city, district } = res.addressComponents;
        this.province = province;
        this.city = city;
        this.district = district;
        this.popoverLocations = res.surroundingPois.map(point => {
          return this.makeShortAddress(point, province, city);
        });

        this.centerToPoint(point);
        this.popoverVisible = true;
      });
    },
    centerToPoint(point) {
      const map = this.map;
      let center = map.pointToPixel(point);
      center = map.pixelToPoint({
        x: center.x,
        y: center.y - 40,
      });
      map.panTo(center);
    },
    makeShortAddress(point, province, city) {
      const { address } = point;
      let shortAddress = address;
      if(shortAddress.startsWith(province)) {
        shortAddress = shortAddress.replace(province, '');
      }
      if(shortAddress.startsWith(city)) {
        shortAddress = shortAddress.replace(city, '');
      }
      point.shortAddress = shortAddress;
      return point;
    },
    pickLocation(location) {
      const { point, shortAddress, title } = location;
      this.lng = point.lng;
      this.lat = point.lat;
      const geocoder = new BMap.Geocoder();
      geocoder.getLocation(point, res => {
        const { province, city, district } = res.addressComponents;
        this.province = province;
        const addr = shortAddress.endsWith(title) ? shortAddress : `${shortAddress}${title}`;
        if(province === city) { // 考虑直辖市情况
          this.city = '市辖区';
          this.address = `${province}${addr}`;
          this.valueText = `${province}\n${addr}`
        } else {
          this.city = city;
          this.address = `${province}${city}${addr}`;
          this.valueText = `${province}${city}\n${addr}`;
        }
        this.district = district;
      });

      this.centerToPoint(point);
      this.popoverVisible = false;
      this.searchPopoverVisible = false;
      this.$refs.searchInput.blur();
      this.search = '';
    }
  }
}
</script>
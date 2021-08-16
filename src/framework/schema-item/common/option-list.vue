<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-form-item label="远程选项">
          <el-switch v-model="isRemote" />
        </el-form-item>
      </el-col>
      <el-col
        v-if="!isRemote"
        :span="12"
      >
        <el-form-item label="智能类型">
          <el-switch
            v-model="typeValue"
          />
        </el-form-item>
      </el-col>
      <el-col
        v-if="isRemote"
        :span="12"
      >
        <el-form-item label="类型">
          <el-switch
            v-model="remoteConf.type"
            inactive-value="api"
            inactive-text="API"
            active-value="func"
            active-text="函数"
          />
        </el-form-item>
      </el-col>
    </el-row>
    
    <el-row v-if="isRemote && remoteConf.type === 'api'">
      <el-col :span="24">
        <el-form-item
          label="选项 API"
        >
          <el-input v-model="api" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="标签字段"
        >
          <el-input
            v-model="labelKey"
            placeholder="name"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="值字段"
        >
          <el-input
            v-model="valueKey"
            placeholder="id"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row v-if="isRemote && remoteConf.type === 'func'">
      <el-col :span="24">
        <CodeEditor
          v-model="func"
        />
      </el-col>
    </el-row>
    
    <el-form-item
      v-if="!isRemote"
      label="选项"
    >
      <DraggableList
        :list="options"
        item-key="id"
        :group="{ put: false, pull: false }"
      >
        <template #item="{ item: option }">
          <DraggableListItem
            :item="option"
            @delete="deleteOption"
          >
            <OptionListItem
              :option="option"
              :type-value="typeValue"
            />
          </DraggableListItem>
        </template>
        <template v-slot:footer>
          <el-button @click="createOption">
            新增选项
          </el-button>
        </template>
      </DraggableList>
    </el-form-item>
  </div>
</template>

<script>
// import DraggableList  from '@/framework/common/draggable-list'
// import DraggableListItem  from '@/framework/common/draggable-list-item'
import OptionListItem from './option-list-item'

export default {
  components: {
    // DraggableList,
    // DraggableListItem,
    OptionListItem,
  },
  props: {
    field: {
      type: Object,
      default() {
        return {};
      },
    },
    forceRemote: {
      type: Boolean,
      default() {
        return false;
      },
    }
  },
  data() {
    return {
      count: 0,
      dragOptions: {
        animation: 200,
        disabled: false,
      },
      tempOptions: [],
      tempFunc: '',
      tempApi: '',
      tempValueKey: '',
      tempLabelKey: '',
      remoteConf: {},
    };
  },
  computed: {
    isRemote: {
      get() {
        return this.forceRemote === true || this.field.isRemote === true;
      },
      set(val) {
        this.$set(this.field, 'isRemote', !!(this.forceRemote || val) ? true : undefined);
      }
    },
    typeValue: {
      get() {
        return !!this.field.typeValue;
      },
      set(val) {
        this.$set(this.field, 'typeValue', !!val ? true : undefined);
      }
    },
    isFunc() {
      return this.isRemote && this.remoteConf.type === 'func';
    },
    isApi() {
      return this.isRemote && this.remoteConf.type === 'api';
    },
    func: {
      get() {
        return this.isFunc ? this.tempFunc : '';
      },
      set(val) {
        if(val || val === '') {
          this.tempFunc = val;
        }
        if(this.isFunc) {
          this.$set(this.remoteConf, 'func', val);
        }
      }
    },
    api: {
      get() {
        return this.isApi ? this.tempApi : '';
      },
      set(val) {
        if(val || val === '') {
          this.tempApi = val;
        }
        if(this.isApi) {
          this.$set(this.remoteConf, 'api', val);
        }
      }
    },
    valueKey: {
      get() {
        return this.isApi ? this.tempValueKey : '';
      },
      set(val) {
        if(val || val === '') {
          this.tempValueKey = val;
        }
        if(this.isApi) {
          this.$set(this.remoteConf, 'valueKey', val);
        }
      }
    },
    labelKey: {
      get() {
        return this.isApi ? this.tempLabelKey : '';
      },
      set(val) {
        if(val || val === '') {
          this.tempLabelKey = val;
        }
        if(this.isApi) {
          this.$set(this.remoteConf, 'labelKey', val);
        }
      }
    },
    options: {
      get() {
        return this.isRemote ? [] : this.tempOptions;
      },
      set(val) {
        this.tempOptions = val;
        this.$set(this.field, 'options', this.options);
      }
    }
  },
  watch: {
    'field.id': {
      handler() {
        const field = this.field;
        this.count = field.options ? field.options.length : 0;
        this.tempOptions = field.options || [];
        this.tempFunc = field.remoteConf && field.remoteConf.func || '';
        this.tempApi = field.remoteConf && field.remoteConf.api || '';
        this.tempValueKey = field.remoteConf && field.remoteConf.valueKey || '';
        this.tempLabelKey = field.remoteConf && field.remoteConf.labelKey || '';
        this.remoteConf = field.remoteConf || { type: 'api' };
      },
      immediate: true,
    },
    isRemote: {
      handler(newValue) {
        if(newValue) {
          this.$delete(this.field, 'options');
          this.$set(this.field, 'remoteConf', this.remoteConf);
          this.$set(this.field, 'isRemote', true);
        } else {
          this.$set(this.field, 'options', this.options);
          this.$delete(this.field, 'remoteConf');
          this.$delete(this.field, 'isRemote');
        }
      },
      immediate: true,
    },
    remoteConf: {
      handler(newValue) {
        this.$set(this.field, 'remoteConf', this.remoteConf);
      },
      deep: true,
    },
    'remoteConf.type': {
      handler(type) {
        if(type === 'api') {
          if(this.field.remoteConf) {
            this.$delete(this.remoteConf, 'func');
            this.$set(this.remoteConf, 'api', this.tempApi);
            this.$set(this.remoteConf, 'valueKey', this.tempValueKey);
            this.$set(this.remoteConf, 'labelKey', this.tempLabelKey);
          }
        } else if(type === 'func') {
          if(this.field.remoteConf) {
            this.$delete(this.remoteConf, 'api');
            this.$delete(this.remoteConf, 'valueKey');
            this.$delete(this.remoteConf, 'labelKey');
            this.$set(this.remoteConf, 'func', this.tempFunc);
          }
        }
      },
      immediate: true,
    }
  },
  methods: {
    createOption() {
      this.count++;
      const id = this.count;

      this.options = [...this.options, {
        id,
        label: `选项${id}`,
        value: `option${id}`,
      }];
    },
    deleteOption(option) {
      this.$confirm('确认删除?', null, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger',
      }).then(() => {
        this.options = this.options.filter(o => o.value !== option.value);

        this.$message({
          type: 'success',
          message: '已删除',
        });
      }).catch(() => {});
    },
  },
};
</script>

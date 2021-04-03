<template>
  <div>
    <el-form-item label="远程选项">
      <el-switch v-model="isRemote" />
    </el-form-item>
    
    <el-row>
      <el-col :span="24">
        <el-form-item
          v-if="isRemote"
          label="选项 API"
        >
          <el-input v-model="remoteConf.api" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          v-if="isRemote"
          label="标签字段"
        >
          <el-input
            v-model="remoteConf.labelKey"
            placeholder="name"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          v-if="isRemote"
          label="值字段"
        >
          <el-input
            v-model="remoteConf.valueKey"
            placeholder="id"
          />
        </el-form-item>
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
            <el-form label-width="40px">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="键">
                    <el-input v-model="option.label" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="值"
                    label-width="40px"
                  >
                    <el-input v-model="option.value" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
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
// import DraggableList  from '@/components/common/draggable-list'
// import DraggableListItem  from '@/components/common/draggable-list-item'

export default {
  components: {
    // DraggableList,
    // DraggableListItem,
  },
  props: {
    field: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      count: this.field.options ? this.field.options.length : 0,
      dragOptions: {
        animation: 200,
        disabled: false,
      },
      remoteConf: {},
    };
  },
  computed: {
    isRemote: {
      get() {
        return this.field.isRemote === true;
      },
      set(val) {
        this.$set(this.field, 'isRemote', !!val ? true : undefined);
      }
    },
    options: {
      get() {
        // return this.field.options ? [...this.field.options] : [];
        return this.field.options || [];
      },
      set(val) {
        this.$set(this.field, 'options', val);
      }
    } 
  },
  watch: {
    isRemote(newValue) {
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
    remoteConf: {
      handler(newValue) {
        this.$set(this.field, 'remoteConf', this.remoteConf);
      },
      deep: true,
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

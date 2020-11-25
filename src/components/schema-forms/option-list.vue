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
        :group="{ put: false, pull: false }"
      >
        <DraggableListItem
          v-for="option in options"
          :key="option.id"
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
        <el-button @click="createOption">
          新增选项
        </el-button>
      </DraggableList>
    </el-form-item>
  </div>
</template>

<script>
import DraggableList  from '@/components/common/draggable-list'
import DraggableListItem  from '@/components/common/draggable-list-item'

export default {
  components: {
    DraggableList,
    DraggableListItem,
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
      count: this.field.options.length,
      dragOptions: {
        animation: 200,
        disabled: false,
      },
      isRemote: false,
      options: this.field.options ? [...this.field.options] : [],
      remoteConf: {},
    };
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
    options: {
      handler(newValue) {
        this.$set(this.field, 'options', this.options);
      },
      deep: true,
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

      this.options.push({
        id,
        label: `选项${id}`,
        value: `option${id}`,
      });
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

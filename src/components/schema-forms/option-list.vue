<template>
  <el-form-item label="选项">
    <DraggableList
      :list="options"
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
      }
    };
  },
  computed: {
    options() {
      return this.field.options;
    },
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
        this.field.options = this.options.filter(o => o.value !== option.value);

        this.$message({
          type: 'success',
          message: '已删除',
        });
      }).catch(() => {});
    },
  },
};
</script>

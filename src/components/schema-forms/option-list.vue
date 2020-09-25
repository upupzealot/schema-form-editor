<template>
  <el-form-item label="选项">
    <Draggable
      :list="options"
      handle=".control.drag"
      v-bind="dragOptions"
    >
      <el-form
        v-for="option in options"
        :key="option.id"
        label-width="40px"
        class="option-form"
      >
        <div class="option-item-wrap">
          <div class="control drag">
            <i class="el-icon-sort" />
          </div>

          <el-row class="option-item">
            <el-col
              :span="12"
              style
            >
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

          <div class="control close">
            <i
              class="el-icon-close"
              @click="deleteOption(option)"
            />
          </div>
        </div>
      </el-form>

      <el-row>
        <el-col>
          <el-button @click="createOption">
            新增选项
          </el-button>
        </el-col>
      </el-row>
    </Draggable>
  </el-form-item>
</template>

<style>
.schema-form .option-item-wrap .el-form-item__label {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>

<style scoped>
.schema-form .option-form {
  margin-bottom: 15px;
}
.schema-form .option-item-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;

  border: 1px dashed #eee;
  padding: 10px 5px;
  margin-bottom: 15px;
}
.schema-form .option-item-wrap .option-item {
  flex-grow: 1;
  flex-shrink: 1;
}
.schema-form .option-item-wrap .control {
  flex-grow: 0;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
.schema-form .option-item-wrap .control.drag {
  width: 40px;
  height: 40px;
  line-height: 40px;
  cursor: move;
}
.schema-form .option-item-wrap .control.close {
  margin-left: 5px;
  cursor: pointer;
}
.schema-form .option-item-wrap .control.close .el-icon-close:hover {
  color: #F56C6C;
}
</style>

<script>
import Draggable from 'vuedraggable';

export default {
  components: {
    Draggable,
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

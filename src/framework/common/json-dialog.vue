<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :visible.sync="dialogVisible"
  >
    <!-- 下载标签（隐藏） -->
    <a
      ref="downloadLink"
      hidden
      :href="downloadStr"
      :download="downloadFilename"
    />
    <!-- 下载按钮 -->
    <el-button
      style="float: right; margin-left: 10px;"
      icon="el-icon-download"
      circle
      @click="onDownload"
    />
    <!-- 复制按钮 -->
    <el-button
      style="float: right;"
      icon="el-icon-copy-document"
      circle
      @click="onCopy"
    />
    
    <!-- JSON 展示 -->
    <pre v-if="!editable">{{ contentStr }}</pre>
    <div
      class="editor-wrapper"
      :class="{'has-error': hasError}"
    >
      <CodeEditor
        v-if="editable"
        v-model="contentStr"
      />
    </div>

    <template v-slot:footer>
      <!-- 关闭按钮 -->
      <el-button
        type="primary"
        @click="dialogVisible = false"
      >
        确 定
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.editor-wrapper {
  border: 1px solid transparent;
  border-radius: 4px;
}
.editor-wrapper.has-error {
  border: 1px solid #F56C6C;
}
</style>

<script>
// import CodeEditor from '@/framework/common/code-editor'

export default {
  components: {
    // CodeEditor
  },
  props: {
    title: {
      type: String,
      default() {
        return 'Json View';
      }
    },
    visible: {
      type: Boolean,
      default() {
        return false;
      }
    },
    content: {
      type: Object,
      default() {
        return {};
      }
    },
    downloadFilename: {
      type: String,
      default() {
        return 'download.json';
      }
    },
    editable: {
      type: Boolean,
      default() {
        return false;
      }
    },
  },
  data() {
    return {
      editorStr: '',
      downloadStr: '',
      hasError: false,
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(visible) {
        this.$emit('update:visible', visible);
      }
    },
    contentStr: {
      get() {
        return this.editorStr;
      },
      set(str) {
        this.editorStr = str;
        try {
          const editorJson = JSON.parse(str);
          this.hasError = false;
          this.$emit('update:content', editorJson);
        } catch (err) {
          this.hasError = true;
        }
      }
    },
  },
  watch: {
    visible: {
      handler(v) {
        this.editorStr = JSON.stringify(this.content, null, 2);
      },
      immediate: true,
    }
  },
  methods: {
    onCopy() {
      this.$clipboard
        .write(this.contentStr)
        .then(() => {
          this.$message({
            message: '复制成功',
            type: 'success',
          });
        }, e => {
          this.$message({
            message: '复制失败',
            type: 'error',
          });
        });
    },
    onDownload() {
      this.downloadStr = `data:text/json;charset=utf-8,${encodeURIComponent(this.contentStr)}`;
      this.$nextTick(()=>{
        this.$refs['downloadLink'].click();
      });
    }
  }
}
</script>

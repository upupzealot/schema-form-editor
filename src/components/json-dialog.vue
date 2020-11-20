<template>
  <el-dialog
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

    <template slot="footer">
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

<script>
export default {
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
      downloadStr: '',
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(visible) {
        this.$emit('update:visible', false);
      }
    },
    contentStr() {
      return JSON.stringify(this.content, null, 2);
    },
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

<template>
  <div class="example-component">
    <a-radio-group
      v-model="value"
      v-model:value="value"
    >
      <a-radio
        value="option1"
      >
        选项一
      </a-radio>
      <a-radio
        value="option2"
      >
        选项二
      </a-radio>
    </a-radio-group>
  </div>
</template>

<script>
export default {
  type: 'radio',
  label: '单选框',
  data() {
    return { value: 'option1' };
  },
  defaultSchema: {
    options: [{
      label: '选项一',
      value: 'option1',
    }, {
      label: '选项二',
      value: 'option2',
    }],
  }
}
</script>

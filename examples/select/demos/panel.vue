<template>
  <div class="tdesign-demo-select-base">
    <!-- 自定义面板顶部内容：如自定义搜索框。同时支持插槽和 Props(this,panelTopContent) -->
    <t-select v-model="value1" :options="options1" clearable placeholder="请选择云解决方案">
      <div slot="panelTopContent">
        <t-textarea v-model="search" placeholder="请输入关键词搜索" @change="onSearch" />
      </div>
    </t-select>

    <!-- 自定义面板底部内容；如新增项 。同时支持插槽和 Props（this,panelBottomContent）-->
    <t-select v-model="value2" placeholder="请选择云产品" clearable>
      <t-option v-for="item in options2" :value="item.value" :label="item.label" :key="item.value"></t-option>
      <!-- 自定义底部内容 -->
      <div slot="panelBottomContent" class="select-panel-footer">
        <t-button v-if="editOrCreate === 'create'" theme="primary" variant="text" @click="onAdd">新增选项</t-button>
        <div v-else>
          <t-input v-model="newOption" autofocus></t-input>
          <t-button @click="onAddConfirm" size="small" style="margin-top: 12px"> 确认 </t-button>
          <t-button @click="onAddCancel" theme="default" size="small" style="margin-top: 12px; margin-left: 8px">
            取消
          </t-button>
        </div>
      </div>
    </t-select>
  </div>
</template>

<script lang="jsx">
const OPTIONS = [
  { label: '架构云', value: '1' },
  { label: '大数据', value: '2' },
  { label: '区块链', value: '3' },
  { label: '物联网', value: '4', disabled: true },
  { label: '人工智能', value: '5' },
];
export default {
  data() {
    return {
      search: '',
      value1: '',
      value2: '',
      editOrCreate: 'create',
      newOption: '',
      // 如果此处数据字段不是 label 和 value，而是 name 和 id，则可以传入参数 `keys` 定义别名
      // 示例： <t-select :options="options1" :keys="{ label: 'name', value: 'id' }" />
      options1: OPTIONS,
      options2: [
        { label: '云服务器', value: '1' },
        { label: '云数据库', value: '2' },
        { label: '域名注册', value: '3' },
      ],
    };
  },
  methods: {
    onSearch() {
      this.options1 = OPTIONS.filter((item) => item.label.indexOf(this.search) !== -1);
    },
    onAdd() {
      this.editOrCreate = 'edit';
    },
    onAddConfirm() {
      const id = Math.round(Math.random() * 100);
      this.options2.push({ label: this.newOption, value: id });
      this.newOption = '';
      this.editOrCreate = 'create';
    },
    onAddCancel() {
      this.editOrCreate = 'create';
    },
  },
};
</script>

<style scoped>
.tdesign-demo-select-base {
  width: 450px;
  display: flex;
}

.tdesign-demo-select-base .t-select__wrap + .t-select__wrap {
  margin-left: 36px;
}

.select-panel-footer {
  border-top: 1px solid var(--td-border-level-2-color);
  margin-top: 8px;
  padding: 8px 0;
}
</style>

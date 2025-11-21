<template>
  <van-search
      v-model="searchText"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      @cancel="onCancel"
  />
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>
  <van-row gutter="16" justify="start">
    <van-col v-for="tag in activeIds" >
      <van-tag closeable size="medium" type="primary" @close="close(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>

  <van-divider content-position="left">未选标签</van-divider>

  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagLists"
  />


</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchText = ref('');

const onSearch = () =>{
  const filteredTagLists = originalTagLists.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = { ...parentTag };
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    // console.log(tempParentTag);
    return tempParentTag;
  });

  tagLists.value = filteredTagLists;

  // 自动跳转至第一个含结果的 tab
  const firstActiveIndex = filteredTagLists.findIndex(tagList => tagList.children.length > 0);
  if (firstActiveIndex !== -1) {
    activeIndex.value = firstActiveIndex;
  }
}
const onCancel = () => {
  searchText.value = '';
  tagLists.value = originalTagLists;
}

// 关闭标签
const close = (tag:any) => {
  activeIds.value = activeIds.value.filter((item) => item !== tag);
};

const activeIds = ref([]);
const activeIndex = ref(0);

const originalTagLists = [
  {
    text: '性别',
    children: [
      { text: '男', id: '男' },
      { text: '女', id: '女' },
    ],
  },
  {
    text: '年级',
    children: [
      { text: '大一', id: '大一' },
      { text: '大二', id: '大二' },
      { text: '大三', id: '大三' },
      { text: '大四', id: '大四' },
    ],
  },
  { text: '方向',
    children: [
      { text: '前端', id: '前端' },
      { text: '后端', id: '后端' },
      { text: '算法', id: '算法' },
      { text: '机器学习', id: '机器学习' },
    ],
  },
];
let tagLists = ref(originalTagLists);

</script>

<style scoped>

</style>


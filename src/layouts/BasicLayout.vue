<script setup>
import {showToast} from "vant";
import {ref} from 'vue';

const onClickLeft = () => alert('返回');
const onClickRight = () => alert('右');

const active = ref(0);
const onChange = (index) => showToast(`标签 ${index}`);


</script>

<template>
  <van-nav-bar title="标题" left-text="返回" left-arrow
               @click-left="onClickLeft"
               @click-right="onClickRight">
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>

  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item name="index" icon="home-o">主页</van-tabbar-item>
    <van-tabbar-item name="team" icon="search">标签</van-tabbar-item>
    <van-tabbar-item name="user" icon="friends-o">个人</van-tabbar-item>
  </van-tabbar>

</template>

<style scoped>

</style>
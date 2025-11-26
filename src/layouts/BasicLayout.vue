<script setup>
import {ref} from 'vue';
import {useRouter} from "vue-router";

const router = useRouter();
const onClickLeft = () => {
  router.back();
}
const onClickRight = () => {
  router.push('/search');
}

// const active = ref(0);
// const onChange = (index) => showToast(`标签 ${index}`);


</script>

<template>
  <van-nav-bar title="标题" left-text="返回" left-arrow
               @click-left="onClickLeft"
               @click-right="onClickRight">
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>
  <div id="comment">
    <router-view />
  </div>

  <van-tabbar route>
    <van-tabbar-item replace to="/" name="index" icon="home-o">主页</van-tabbar-item>
    <van-tabbar-item replace to="/team" name="team" icon="search">标签</van-tabbar-item>
    <van-tabbar-item replace to="/user" name="user" icon="friends-o">个人</van-tabbar-item>
  </van-tabbar>

</template>

<style scoped>
#comment {
  padding-bottom: 50px;
}
</style>
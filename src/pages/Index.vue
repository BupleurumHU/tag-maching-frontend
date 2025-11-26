<template>
  <user-card-list :user-list="userList"  />
  <van-empty v-if="!userList || userList.length < 1" description="数据为空" />
</template>
<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showToast} from "vant";
// import qs from 'qs';
import type {CurrentUser} from "../models/user";
import UserCardList from "../components/UserCardList.vue";

const userList = ref<CurrentUser[]>([]);
const route = useRoute();
const searchTags = typeof route.query.tags === 'string'
    ? route.query.tags.split(',')
    : Array.isArray(route.query.tags)
        ? route.query.tags
        : [];

console.log('搜索标签:', searchTags);
console.log('是否数组:', Array.isArray(searchTags));
onMounted(()=>{
  myAxios.get('/user/recommend', {
    params: {
      pageNum: 1,
      pageSize: 15,
    },
  })
      .then(function (response) {
        console.log('/user/recommend succeed', response);
        // 对返回的数据进行处理，将 tags 字符串转换为数组
        userList.value = response.data?.records?.map((user: any) => ({
          ...user,
          tags: typeof user.tags === 'string' ?
              (() => {
                try {
                  return JSON.parse(user.tags);
                } catch (e) {
                  console.error('Failed to parse tags for user:', user.id, e);
                  return []; // 解析失败时返回空数组
                }
              })() :
              user.tags
        })) || [];
        showToast('搜索成功');
      })
      .catch(function (error) {
        console.error('/user/recommend',error);
        showFailToast('搜索失败');
      })
})
</script>


<style scoped>

</style>
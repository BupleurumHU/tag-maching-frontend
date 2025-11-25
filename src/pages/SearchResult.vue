<template>
  <van-card
      v-for="user in userList"
      :key="user.id"
      :desc="user.profile"
      :title="`${user.username}(${user.plantNo})`"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="primary" v-for="tag in user.tags" :key="tag" style="margin: 5px;">
        {{tag}}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
  <van-empty v-if="!userList || userList.length < 1" description="没有搜索结果" />
</template>
<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showToast} from "vant";
import qs from 'qs';
import type {CurrentUser} from "../models/user";

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
  myAxios.get('/user/search/tags', {
    params: {
      tagNameList: searchTags
    },
    paramsSerializer: function(params) {
      return qs.stringify(params, { arrayFormat: 'repeat' }); // 或者 'brackets', 'indices'
    }
  })
      .then(function (response) {
        console.log('/user/search/tags succeed', response);
        // 对返回的数据进行处理，将 tags 字符串转换为数组
        userList.value = response.data?.data?.map((user: any) => ({
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
        console.error('/user/search/tags',error);
        showFailToast('搜索失败');
      })
})

// const user = {
//   id: 1,
//   username: 'test',
//   userAccount: 'test',
//   avatarUrl: 'https://avatars.githubusercontent.com/u/28926426?v=4',
//   gender:'男',
//   profile:'个人爱好编程，喜欢和他人沟通交流',
//   phone: '13455668877',
//   email: 'dsf@qq.com',
//   plantNo: '1122',
//   tags: ['java','test','test','test','test','test','test','test','test','test'],
//   createTime: new Date(),
// };
</script>


<style scoped>

</style>
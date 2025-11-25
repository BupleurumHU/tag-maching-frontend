<template>
  <van-cell-group inset v-if="user">
    <van-cell title="用户名" is-link to="/user/edit" :value="user.username" @click="toEdit('username','用户名',user.username)"/>
    <van-cell title="账号" is-link to="/user/edit" :value="user.userAccount" @click="toEdit('userAccount','账号',user.userAccount)"/>
    <van-cell title="头像" is-link to="/user/edit" @click="toEdit('avatarUrl','头像',user.avatarUrl)">
      <van-image
      round
      width="48px"
      fit="cover"
      position="center"
      :src="user.avatarUrl"
      />
    </van-cell>
    <van-cell title="性别" is-link to="/user/edit"  :value="user.gender" @click="toEdit('gender','性别',user.gender.toString())" />
    <van-cell title="电话" is-link to="/user/edit"  :value="user.phone" @click="toEdit('phone','电话',user.phone)" />
    <van-cell title="邮箱" is-link to="/user/edit"  :value="user.email" @click="toEdit('email','邮箱',user.email)" />
    <van-cell title="星球编号" is-link to="/user/edit"  :value="user.plantNo" @click="toEdit('planetNo','星球编号',user.plantNo)" />
    <van-cell title="标签" is-link to="/user/edit" :value="user.tags.join(', ')" @click="toEdit('tags','标签',user.tags.join(', '))"/>
    <van-cell title="注册时间" is-link to="/user/edit"  :value="user.createTime.toISOString()" @click="toEdit('createTime','注册时间',user.createTime)"/>
  </van-cell-group>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import type {CurrentUser} from "../models/user";
import {getCurrentUser} from "../services/user.ts";

// const user = {
//   id: 1,
//   username: 'test',
//   userAccount: 'test',
//   avatarUrl: 'https://avatars.githubusercontent.com/u/28926426?v=4',
//   gender:'男',
//   phone: '13455668877',
//   email: 'dsf@qq.com',
//   plantNo: '1122',
//   tags: ['java','test'],
//   createTime: new Date(),
// }
const user = ref<CurrentUser>()

onMounted(async () => {
  const res = await getCurrentUser();
  if(res){
    user.value = res;
  }
})
const route = useRouter();
const toEdit = (key:string,title:string,value:any) => {
  route.push({
    path:'/user/edit',
    query:{
      key,
      title,
      value
    }
  })
}

</script>
<style scoped>

</style>
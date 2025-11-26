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
</template>


<script setup lang="ts">
import type {CurrentUser} from "../models/user";

interface UserCardListProps{
  userList:CurrentUser[]
}

defineProps<UserCardListProps>()

</script>



<style scoped>

</style>
<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editUser.editValue"
          :name="editUser.editKey"
          :label="editUser.editTitle"
          :placeholder="`请输入${editUser.editTitle}`"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import myAxios, {type BaseResponse} from "../plugins/myAxios.ts";
import type {CurrentUser} from "../models/user";
import {showFailToast, showToast} from "vant";

const route = useRoute();
// 类型转换函数
const getStringValue = (value: any): string => {
  if (Array.isArray(value)) {
    return value[0] || '';
  }
  return value || '';
};

const editUser = ref({
  editKey: getStringValue(route.query.key),
  editTitle: getStringValue(route.query.title),
  editValue: getStringValue(route.query.value),
})

const router = useRouter();
const user = ref<CurrentUser>()

const onSubmit =async () => {
  const res = await getCurrentUser();
  if (res) {
    user.value = res;
  }
  if (user.value) {
    const res:BaseResponse<number> = await myAxios.post('/user/update', {
      [editUser.value.editKey]: editUser.value.editValue,
      id: user.value.id,
    });
    if (res.code === 0) {
      showToast('更新成功');
      await getCurrentUser();
      router.back();
    } else {
      showFailToast('更新失败');
    }
  } else {
    showFailToast('获取用户信息失败');
  }
};

</script>

<style scoped>

</style>
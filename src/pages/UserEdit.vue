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
import {useRoute} from "vue-router";
import {ref} from "vue";

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

const onSubmit = (values) => {
  //todo 将editUser发送给后端
  console.log('submit', values);
};

</script>

<style scoped>

</style>
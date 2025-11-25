import myAxios from "../plugins/myAxios.ts";
import type {CurrentUser} from "../models/user";
import {showFailToast} from "vant";

export const getCurrentUser = async () => {
    const res = await myAxios.get('/user/current');
    if (res.data.code === 0 && res.data.data) {
        //将res.data.data中的tags转换成数组
        res.data.data.tags = res.data.data.tags.split(',');
        res.data.data.createTime = new Date(res.data.data.createTime);
        return res.data.data as CurrentUser;
    } else {
        showFailToast("获取用户失败")
        return null;
    }
}
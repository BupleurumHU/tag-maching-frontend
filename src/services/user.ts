import myAxios, {type BaseResponse} from "../plugins/myAxios.ts";
import type {CurrentUser} from "../models/user";
import {showFailToast} from "vant";

export const getCurrentUser = async () => {
    const res:BaseResponse<CurrentUser> = await myAxios.get('/user/current');
    if (res.code === 0 && res.data) {
        //将res.data.data中的tags转换成数组
        console.log('res.data.tags',res.data.tags);
       if (Array.isArray(res.data.tags)) {
            // 如果已经是数组，则不做处理
            console.log('res.data.tags 是数组');
        } else {
            // 兜底处理，防止异常
           if(res.data.tags === ''){
               res.data.tags = [];
           }
           // 将res.data.tags类型强制转为字符串
           res.data.tags = res.data.tags.toString().split(',');
        }
        res.data.createTime = new Date(res.data.createTime);
        return res.data as CurrentUser;
    } else {
        showFailToast("获取用户失败")
        return null;
    }
}
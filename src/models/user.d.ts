export type CurrentUser = {
    id: number;
    username: string;
    userAccount: string;
    avatarUrl?: string;
    gender:number;
    phone: string;
    email: string;
    userStatus: number;
    userRole: number;
    plantNo: string;
    tags: string[];
    createTime: Date;
};
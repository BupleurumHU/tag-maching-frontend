export type CurrentUser = {
    id: number;
    username: string;
    userAccount: string;
    avatarUrl?: string;
    gender:number;
    profile:string;
    phone: string;
    email: string;
    userStatus: number;
    userRole: number;
    plantNo: string;
    tags: string[];
    createTime: Date;
};
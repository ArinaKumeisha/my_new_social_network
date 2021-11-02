import {PhotosType, ProfilesType, UserType} from "../types/types";
import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "f499194a-9fc7-4a05-a45f-a1732e1abd57"
    }
});

export type ResponseUserType<T={}> = {
    items: T
    totalCount: number
    error: number
}

export type CommonType<T={}> = {
    resultCode: number
    messages: string[],
    data: T
}


export type AuthMeType= {
    id: string
    email: string
    login: string
}
export const usersAPI = {
    getUsers: (currentPage: number = 10, pageSize: number = 100, term: string='', friend: boolean| null=null) => {
        return instance.get<ResponseUserType<UserType[]>>(`users?page=${currentPage}&count=${pageSize}&term=${term}`+ (friend !==null ? `&friend=${friend}` : ''))
            .then(response => {
                return response.data
            })
    },
    follow(userId: string | number) {
        return instance.post<CommonType>(`follow/` + userId, {}, {})

    }, unFollow(userId: string | number) {
        return instance.delete<CommonType>(`follow/` + userId, {})
    }
}

export const authAPI = {
    me() {
        return instance.get<CommonType<AuthMeType>>(`auth/me`, {})
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post<CommonType<{userId: number}>>(`auth/login`, {email, password, rememberMe})
    },
    logOut() {
        return instance.delete<CommonType>(`auth/login`,{})
    }

}

export const profileAPI = {
    getUserProfile(userId: string) {
        return instance.get<ProfilesType>(`profile/` + userId,
        )
    },
    getStatus(userId: string) {
        return instance.get<any>(`profile/status/` + userId,)
    },
    updateStatus(status: string) {
        return instance.put<CommonType>(`profile/status`, {status: status})
    },
    savePhoto(photoFile: any) {
        let formData = new FormData();
        formData.append('image', photoFile);
       return instance.put<CommonType<{photos:PhotosType }>>(`profile/photo`,formData,  {
           headers: {
               'Content-Type': 'multipart/form-data'
           }
       })
    }
}












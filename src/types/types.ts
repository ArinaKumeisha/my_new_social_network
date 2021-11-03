//profile
import {FilterType} from "../redux/users-reducer";
import {SaveProfileType} from "../redux/profile-reducer";

export type PostsType = {
    id: number
    message: string
    likeCount: number
    img: string
}
export type ProfilesType = {
    userId: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType|null
    photos: PhotosType
    aboutMe: ''
}
export type ProfileType = {
    profile: ProfilesType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photos: PhotosType) => void
    userId: string
    saveProfile: (profile: ProfilesType) => void
    error: string | null
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
    /*totalCount: number*/
}

//auth

export type GetAuthUserType = {
    id: string
    email: string | null
    login: string | null
    isAuth: boolean
}

//dialogs
export type MessagesType = {
    id: number
    message: string
}
export type DialogsType = {
    id: number
    name: string
    img: string
}
//users
export type UsersType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    follow: (userID: number) => void,
    unFollow: (userID: number) => void,
    onPageHandler: (pageNumber: number) => void
    followingInProgress: number[]
    onFilterChanged: (filter: FilterType)=> void
}
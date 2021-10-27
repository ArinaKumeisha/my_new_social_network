import {Dispatch} from "redux";
import {profileAPI} from "../api/api";
import {PhotosType, PostsType, ProfilesType} from "../types/types";

export enum ACTION_TYPE {
    ADD_POST = "PROFILE/ADD-POST",
    SET_STATUS = "PROFILE/SET_STATUS",
    DELETE_POST = "PROFILE/DELETE-POST",
    SET_USER_PROFILE_SUCCESS = "PROFILE/SET_USER_PROFILE_SUCCESS",
    SEND_MESSAGE = "DIALOGS/SEND-MESSAGE",
    FOLLOW_SUCCES = "USERS/FOLLOW_SUCCES",
    UN_FOLLOW_SUCCESS = "USERS/UN_FOLLOW_SUCCESS",
    SET_USERS = "USERS/SET_USERS",
    SET_CURRENT_PAGE = "USERS/SET_CURRENT_PAGE",
    SET_TOTAL_USER_COUNT = "USERS/SET-TOTAL_USER_COUNT",
    TOGGLE_IS_FETCHING = "USERS/TOGGLE-IS-FETCHING",
    TOGGLE_IS_FOLLOWING_PROGRESS = "USERS/TOGGLE-IS_FOLLOWING-PROGRESS",
    GET_USER_DATA_SUCCESS = "AUTH/ACTION_TYPE.GET_USER_DATA_SUCCESS",
    INITIALIZED_SUCCESS = "APP/INITIALIZED-SUCCESS",
    SAVE_PHOTO = "PROFILE/SAVE-PHOTO"
}


export type ProfileActionType =
    AddPostAT |
    setUserProfileSuccessAT |
    SetStatusAT |
    DeletePostAT |
    SavePhotoAT

export type InitialStateType = typeof initialState

let initialState = {
    profile: null as ProfilesType | null,
    status: '',
    newPostText: '',
    posts: [
        {
            id: 2,
            message: "Hello, how are you?",
            likeCount: 15,
            img: "https://www.fotoprizer.ru/img_inf/st_221.jpg"
        },
        {
            id: 1,
            message: "It's my first post",
            likeCount: 18,
            img: "https://www.fotoprizer.ru/img_inf/st_221.jpg"
        },
    ] as Array<PostsType>,
}
export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionType): InitialStateType => {
    switch (action.type) {
        case ACTION_TYPE.ADD_POST:
            const newPost: PostsType = {
                id: new Date().getTime(),
                message: action.newMessagePost,
                likeCount: 0,
                img: "https://www.fotoprizer.ru/img_inf/st_221.jpg",
            }
            return {
                ...state,
                posts: [newPost, ...state.posts],
            }
        case ACTION_TYPE.DELETE_POST: {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }

        case ACTION_TYPE.SET_STATUS:
            return {
                ...state, status: action.status
            }
        case ACTION_TYPE.SET_USER_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.profile
            }
        case ACTION_TYPE.SAVE_PHOTO:
            if (state.profile) {
                return {...state, profile: {...state.profile, photos: action.photos}}
            }
            return {...state}

        default:
            return state
    }
}
export type AddPostAT = {
    type: ACTION_TYPE.ADD_POST,
    newMessagePost: any
}
export type setUserProfileSuccessAT = {
    type: ACTION_TYPE.SET_USER_PROFILE_SUCCESS,
    profile: ProfilesType | null
}
export type SetStatusAT = {
    type: ACTION_TYPE.SET_STATUS,
    status: string,
}

export const addPostAC = (newMessagePost: string): AddPostAT => {
    return {
        type: ACTION_TYPE.ADD_POST,
        newMessagePost,
    } as const
}
export type DeletePostAT = ReturnType<typeof deletePostAC>
export const deletePostAC = (postId: number) => {
    return {
        type: ACTION_TYPE.DELETE_POST,
        postId,
    } as const
}

export const setStatusAC = (status: string): SetStatusAT => {
    return {
        type: ACTION_TYPE.SET_STATUS,
        status,
    } as const
}
export const setUserProfileSuccess = (profile: ProfilesType) => {
    return {
        type: ACTION_TYPE.SET_USER_PROFILE_SUCCESS,
        profile,
    } as const
}

export const getUserStatus = (userId: string) => async (dispatch: Dispatch<ProfileActionType>) => {
    try {
        const response = await profileAPI.getStatus(userId)
        dispatch(setStatusAC(response.data))
    } catch (e) {
        throw  Error
    }
}
export type SavePhotoAT = ReturnType<typeof savePhotoAC>
export const savePhotoAC = (photos: PhotosType) => {
    return {
        type: ACTION_TYPE.SAVE_PHOTO,
        photos,
    } as const
}
export const setUserProfile = (userId: string) => async (dispatch: Dispatch<ProfileActionType>) => {
    try {
        const response = await profileAPI.getUserProfile(userId)
        dispatch(setUserProfileSuccess(response.data))
    } catch (e) {
        throw  Error
    }
}
export const updateStatus = (status: string) => {
    return async (dispatch: Dispatch<ProfileActionType>) => {
        try {
            const response = await profileAPI.updateStatus(status)
            if (response.data.resultCode === 0) {
                dispatch(setStatusAC(status))
            }
        } catch (error) {
            throw  Error
        }
    }
}
export const savePhoto = (photos: PhotosType) => {
    return async (dispatch: Dispatch<ProfileActionType>) => {
        try {
            const response = await profileAPI.savePhoto(photos)
            if (response.data.resultCode === 0) {
                dispatch(savePhotoAC(response.data.data.photos))
            }
        } catch (e) {
            console.log(e)
        }
    }
}






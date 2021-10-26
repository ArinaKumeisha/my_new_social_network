import {ACTION_TYPE} from "./profile-reducer";
import {Dispatch} from "redux";
import {usersAPI} from "../api/api";
import {UserType} from "../types/types";

export type UsersActionType = FollowAT |
    UnFollowAT |
    SetUsersAT |
    SetCurrentPageAT |
    SetTotalUserCountAT |
    ToggleIsFetchingAT |
    ToggleIsFollowingProgressAT

type InitialStateType = typeof initialState
export const initialState = {
    users: [] as UserType[],
    pageSize: 10,   // количество userov на одной странице
    totalUsersCount: 20,  // сколько всего пользователей
    currentPage: 1,   // текущая страница которую просматриваем
    isFetching: false,
    followingInProgress: [] as number[] //id пользователей
}

export const usersReducer = (state = initialState, action: UsersActionType): InitialStateType => {

    switch (action.type) {
        case ACTION_TYPE.FOLLOW_SUCCES:
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: true} : u)}

        case ACTION_TYPE.UN_FOLLOW_SUCCESS:
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: false} : u)}

        case ACTION_TYPE.SET_USERS:
            return {...state, users: action.users}

        case ACTION_TYPE.SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}

        case ACTION_TYPE.SET_TOTAL_USER_COUNT:
            return {...state, totalUsersCount: action.count}

        case ACTION_TYPE.TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}

        case ACTION_TYPE.TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state
    }
}

type FollowAT = {
    type: ACTION_TYPE.FOLLOW_SUCCES
    userID: number
}
type UnFollowAT = {
    type: ACTION_TYPE.UN_FOLLOW_SUCCESS
    userID: number
}
type SetUsersAT = {
    type: ACTION_TYPE.SET_USERS
    users: UserType[]
}
type SetCurrentPageAT = {
    type: ACTION_TYPE.SET_CURRENT_PAGE
    currentPage: number
}

type SetTotalUserCountAT = {
    type: ACTION_TYPE.SET_TOTAL_USER_COUNT
    count: number
}

type ToggleIsFetchingAT = {
    type: ACTION_TYPE.TOGGLE_IS_FETCHING
    isFetching: boolean
}
type ToggleIsFollowingProgressAT = {
    type: ACTION_TYPE.TOGGLE_IS_FOLLOWING_PROGRESS
    userId: number
    isFetching: boolean
}
export const followSucces = (userID: number): FollowAT => {    // функции AC
    return {
        type: ACTION_TYPE.FOLLOW_SUCCES,
        userID: userID,
    } as const
}
export const unFollowSuccess = (userID: number): UnFollowAT => {  // функции AC
    return {
        type: ACTION_TYPE.UN_FOLLOW_SUCCESS,
        userID: userID
    } as const
}

export const setUsers = (users: Array<UserType>): SetUsersAT => {  // функции AC
    return {
        type: ACTION_TYPE.SET_USERS,
        users: users,
    } as const
}
export const setCurrentPage = (currentPage: number): SetCurrentPageAT => {  // функции AC
    return {
        type: ACTION_TYPE.SET_CURRENT_PAGE,
        currentPage,
    } as const
}
export const setTotalUserCount = (totalUsersCount: number): SetTotalUserCountAT => {  // функции AC
    return {
        type: ACTION_TYPE.SET_TOTAL_USER_COUNT,
        count: totalUsersCount
    } as const
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingAT => {  // функции AC
    return {
        type: ACTION_TYPE.TOGGLE_IS_FETCHING,
        isFetching,
    }
}
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number): ToggleIsFollowingProgressAT => {
    return {
        type: ACTION_TYPE.TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId,
    } as const
}

export const requestUsers = (page: number, pageSize: number) => async (dispatch: Dispatch<UsersActionType>) => {
    dispatch(setCurrentPage(page))
    dispatch(toggleIsFetching(true))
    try {
        const data = await usersAPI.getUsers(page, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUserCount(data.totalCount))
    } catch (e) {
        throw  Error
    }
}

const followUnFollow = async (dispatch: Dispatch<UsersActionType>, userId: number, method: any, actionCreator: Function) => {
    dispatch(toggleIsFollowingProgress(true, userId))
    const response = await method(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleIsFollowingProgress(false, userId))
}
export const follow = (userId: number) => async (dispatch: Dispatch<UsersActionType>) => {
    followUnFollow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSucces)
}

export const unFollow = (userId: number) => async (dispatch: Dispatch<UsersActionType>) => {
    followUnFollow(dispatch, userId, usersAPI.unFollow.bind(usersAPI), unFollowSuccess)
}




import {AppStateType} from "./redux_store";
import {createSelector} from "reselect";

export const getDialogsPage = (state: AppStateType) => {
    return state.dialogsPage
}

export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}

export const getLogin = (state: AppStateType) => {
    return state.auth.login
}

export const getProfile = (state: AppStateType) => {
    return state.profilePage.profile
}
export const getStatus = (state: AppStateType) => {
    return state.profilePage.status
}
export const getId = (state: AppStateType) => {
    return state.auth.id
}
export const getPosts = (state: AppStateType) => {
    return state.profilePage.posts
}
export const getUsers = (state: AppStateType) => {
    return state.usersPage.users
}
export const getUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter
}
export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}

export const getUsersSuper = createSelector(
    getUsers, (users) => {                                        // из библиотеки reselect!
        return users.filter(u => true)
    })
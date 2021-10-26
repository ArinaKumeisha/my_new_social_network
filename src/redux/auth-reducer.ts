import {ACTION_TYPE} from "./profile-reducer";
import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {AppThunk} from "./redux_store";
import {FormAction, stopSubmit} from "redux-form";
import {GetAuthUserType} from "../types/types";


export const initialState = {
    id: '',
    email: null as string|null,
    login: null as string|null,
    isAuth: false,
    error: null,
    capchaUrl: null as string|null,
}
type InitialStateType = typeof initialState

export type AuthActionType = SuccesType| FormAction

export const authReducer = (state = initialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case ACTION_TYPE.GET_USER_DATA_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state
    }
}

type SuccesType = {
    type: ACTION_TYPE.GET_USER_DATA_SUCCESS,
    payload: GetAuthUserType
}
export const succes = (id: string , email: string | null, login: string | null, isAuth: boolean): SuccesType => {  // функции AC
    return {
        type: ACTION_TYPE.GET_USER_DATA_SUCCESS,
        payload: {id, email, login, isAuth,}
    }
}
export const getAuthUserData = () => {
    return async (dispatch: Dispatch<AuthActionType>) => {
        try {
            const res = await authAPI.me()
            if (res.data.resultCode === 0) {
                let {id, email, login} = res.data.data
                dispatch(succes(id, email, login, true))
            }
        }catch (e){
            throw  Error
        }

    }
}
export const login = (email: string, password: string, rememberMe: boolean):AppThunk => {
    return async dispatch => {
        try {
            const res = await authAPI.login(email, password, rememberMe,)
            if (res.data.resultCode === 0) {
                dispatch(getAuthUserData())
            } else {
                let message = res.data.messages.length > 0 ? res.data.messages[0] : 'Some error'
                dispatch(stopSubmit("login", {_error: message}))
            }

        } catch (e) {
            throw  Error
        }
    }
}
export const logOut = () => async (dispatch: Dispatch<AuthActionType>) => {
    try {
        const res = await authAPI.logOut()
        if (res.data.resultCode === 0) {
            dispatch(succes('', null, null, false))
        }
    }catch (e) {
       throw  Error
    }

}





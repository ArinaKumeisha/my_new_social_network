import {ACTION_TYPE} from "./profile-reducer";
import {Dispatch} from "redux";
import {authAPI, securityAPI} from "../api/api";
import {AppThunk} from "./redux_store";
import {FormAction} from "redux-form";
import {GetAuthUserType} from "../types/types";


export const initialState = {
    id: '',
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    messageError: null as string | null,
    captchaUrl: null as string | null,
}
type InitialStateType = typeof initialState

export type AuthActionType = SuccessType | FormAction | getCaptchaUrlSuccessType | SetErrorType

export const authReducer = (state = initialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case ACTION_TYPE.GET_USER_DATA_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        case ACTION_TYPE.GET_CAPTCHA:
            return {
                ...state,
                ...action.payload,
            }
        case ACTION_TYPE.PROFILE_SET_ERROR:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }
}

type SuccessType = {
    type: ACTION_TYPE.GET_USER_DATA_SUCCESS,
    payload: GetAuthUserType
}
export const success = (id: string, email: string | null, login: string | null, isAuth: boolean): SuccessType => {  // функции AC
    return {
        type: ACTION_TYPE.GET_USER_DATA_SUCCESS,
        payload: {id, email, login, isAuth,}
    }
}
type getCaptchaUrlSuccessType = ReturnType<typeof getCaptchaUrlSuccess>

export const getCaptchaUrlSuccess = (captchaUrl: string | null) => ({
    type: ACTION_TYPE.GET_CAPTCHA,
    payload: {captchaUrl}
} as const)

export type SetErrorType = ReturnType<typeof setError>
export const setError = (messageError: string) => ({type: ACTION_TYPE.PROFILE_SET_ERROR, payload: {messageError}})

export const getAuthUserData = () => {
    return async (dispatch: Dispatch<AuthActionType>) => {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            let {id, email, login} = res.data.data
            dispatch(success(id, email, login, true))
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null = null): AppThunk => {
    return async dispatch => {
        const res = await authAPI.login(email, password, rememberMe, captcha)
        if (res.data.resultCode === 0) {
            debugger
            dispatch(getAuthUserData())
        } else {
            debugger
            if (res.data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            let message = res.data.messages.length > 0 ? res.data.messages[0] : 'Some error'
            dispatch(setError(message))
        }

    }
}
export const logOut = () => async (dispatch: Dispatch<AuthActionType>) => {
    try {
        const res = await authAPI.logOut()
        if (res.data.resultCode === 0) {
            dispatch(success('', null, null, false))
        }
    } catch (e: any) {
        console.log(e.message)
    }
}
export const getCaptchaUrl = () => async (dispatch: Dispatch<AuthActionType>) => {
    const res = await securityAPI.getCaptcha()
    dispatch(getCaptchaUrlSuccess(res.data.url))
    console.log(res.data.url)

}
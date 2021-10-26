import {getAuthUserData} from "./auth-reducer"
import {ACTION_TYPE} from "./profile-reducer"
import {AppThunk} from "./redux_store"

type InitialStateType = typeof initialState
const initialState = {
    inicialized: false
}
export const appReducer = (state: InitialStateType = initialState, action: AppActionsReducerType): InitialStateType => {
    switch (action.type) {
        case ACTION_TYPE.INITIALIZED_SUCCESS:
            return {...state, inicialized: true}
        default:
            return state
    }
}
type InicializedAT = ReturnType<typeof inicializedAC>
export type AppActionsReducerType = InicializedAT

export const inicializedAC = () => {
    return {
        type: ACTION_TYPE.INITIALIZED_SUCCESS,
    }
}

export const inicializedApp = (): AppThunk => dispatch => {
    let promise = dispatch(getAuthUserData())
    promise.then(() => {
        dispatch(inicializedAC())
    })
}


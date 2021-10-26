import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {ProfileActionType, profileReducer} from "./profile-reducer";
import {DialogActionType, dialogsReducer} from "./dialogs-reducer";
import {UsersActionType, usersReducer} from "./users-reducer";
import {AuthActionType, authReducer} from "./auth-reducer";
import thunkMiddleWare, {ThunkAction} from "redux-thunk"
import {reducer as formReducer} from 'redux-form'
import {NewReducer} from "../components/New/new-reducer";
import {AppActionsReducerType, appReducer} from "./app-reducer";

/*export type ActionsType =
    ReturnType<typeof addPostAC> |
    ReturnType<typeof changeTextareaAC> |
    ReturnType<typeof upDateNewMessageTextAC> |
    ReturnType<typeof sendMessageAC>*/



let rootReducer = combineReducers({              //rootReducer возвращает state
    profilePage: profileReducer,  //это наш целый стэйт
    dialogsPage: dialogsReducer,  // ключ: значение
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    new: NewReducer,
    app: appReducer,
})


export type AppStateType = ReturnType<typeof rootReducer>   //  ReturnType -> дай мне  возвращаемый тип rootReducera

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppStateType,
    unknown,
    AppActionsType>

export type AppActionsType =
    AppActionsReducerType | AuthActionType |
    DialogActionType | ProfileActionType |
    UsersActionType

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose   //подключили redux vtool
export let store = createStore(rootReducer,composeEnhancers( applyMiddleware(thunkMiddleWare)))
//@ts-ignore
window.store = store


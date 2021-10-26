import React from 'react';
import {InitialStateType, sendMessageAC} from "../../redux/dialogs-reducer";
import {AppStateType} from "../../redux/redux_store";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import Dialogs from "./Dialogs";
import { withAuthRedirect } from '../../hoc/WithAuthRedirects';
import {getDialogsPage} from '../../redux/select'


export type MapStatePropsType = {
    dialogsPage: InitialStateType
}
export type MapDispatchPropsType = {
    sendNewMessage: (newMessageBody: string) => void
}
export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {   // AppStateType это type всего нашего state!!! и возвращает частичку state из редьюсера
    return {
        dialogsPage: getDialogsPage(state),
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {   //dispatch импортируем из redux
    return {
        sendNewMessage: (newMessageBody: string) => {
            dispatch(sendMessageAC(newMessageBody))
        }
    }
}
export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(Dialogs)




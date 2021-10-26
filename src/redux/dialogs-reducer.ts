import { DialogsType, MessagesType } from "../types/types";
import {ACTION_TYPE} from "./profile-reducer";


export type InitialStateType = typeof initialState
export type DialogActionType = SendMessageAT
let initialState = {
    dialogs: [
        {
            id: 1,
            name: "Marina",
            img: "https://video-pricheski.ru/photo/img/foto-devushek-s-korotkoi-strizhkoi-dlia-avy-3.jpg"
        },
        {
            id: 2,
            name: "Alina",
            img: "https://bipbap.ru/wp-content/uploads/2017/05/370.jpg"
        },
        {
            id: 3,
            name: "Alex",
            img: "https://prikolnye-kartinki.ru/img/picture/Aug/23/f0b9e5a7d4b40ce999e2ba9b4e4d1b39/2.jpg"
        },
        {id: 4, name: "Viktor", img: "https://87.img.avito.st/640x480/8817015087.jpg"},
        {
            id: 6,
            name: "Anna",
            img: "https://i.pinimg.com/originals/b2/95/45/b29545916fbf406f7cec10ff1845a191.jpg"
        },
    ] as Array<DialogsType>,
    messages: [
        {id: 1, message: "How are you?"},
        {id: 2, message: "Hello"},
        {id: 3, message: "Yo"},
    ] as Array<MessagesType>,
}


export const dialogsReducer = (state = initialState, action: DialogActionType): InitialStateType => {
    switch (action.type) {
        case ACTION_TYPE.SEND_MESSAGE:
            const nextMessage: MessagesType = {
                id: new Date().getTime(),
                message: action.newMessageBody
            }

            return {
                ...state, messages: [nextMessage, ...state.messages],
            }
        default:
            return state
    }
}
type SendMessageAT = {
    type: ACTION_TYPE.SEND_MESSAGE,
    newMessageBody: string
}
export const sendMessageAC = (newMessageBody: string): SendMessageAT => {
    return (
        {
            type: ACTION_TYPE.SEND_MESSAGE,
            newMessageBody,
        }
    ) as const
}

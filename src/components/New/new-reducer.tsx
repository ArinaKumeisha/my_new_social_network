
export type initialStateType = {
    messageForState: messageForStateType[]
}
export type messageForStateType = {
    id: number
    message: string
}
const initialState = {
    messageForState:[
        {id: 1, message: "hello"},
        {id: 2, message: "hi"},
    ]
}
type actionType = {
    type: "ADD_MESSAGE"
    messageForm: string
}
export const NewReducer = (state = initialState, action: actionType): initialStateType => {
    switch (action.type) {
        case "ADD_MESSAGE":
            const newMessage = {
                id: new Date().getTime(),
                message: action.messageForm,
            }
            return {
                ...state, messageForState: [newMessage, ...state.messageForState]
            }

        default: {
            return state
        }
    }
}
export const addNewMessageForm = (messageForm: string): actionType => {
    return (
        {
            type: "ADD_MESSAGE",
            messageForm
        }
    ) as const
}

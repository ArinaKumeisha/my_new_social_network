export {}/*
//@ts-ignore
import {dialogsReducer, sendMessageAC, upDateNewMessageTextAC} from "./dialogs-reduser";
//@ts-ignore
import {addPostAC, changeTextAC, profileReducer} from "./profile-reducer";



 type MessagesType = {
    id: number
    message: string
}

 type DialogsType = {
    id: number
    name: string
    img: string

}

export type PostsType = {
    id: number
    message: string
    likeCount: number
    img: string
}

 type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
}

 type DialogsPageType = {
    newMessageText: string
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
}


 type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType


}
 type StoreType = {
    _state: RootStateType
    _onChange: () => void
    subscribe: (callback: () => void) => void
    getState: () => RootStateType
    dispatch: (action: ActionsType) => void
}


type ActionsType =
    ReturnType<typeof addPostAC> |
    ReturnType<typeof changeTextAC> |
    ReturnType<typeof upDateNewMessageTextAC> |
    ReturnType<typeof sendMessageAC>



const store: StoreType = {
    _state: {
        profilePage: {
            newPostText: "Arina",
            posts: [
                {
                    id: 1,
                    message: "Hello, how are you?",
                    likeCount: 15,
                    img: "https://www.fotoprizer.ru/img_inf/st_221.jpg"
                },
                {
                    id: 2,
                    message: "It's my first post",
                    likeCount: 18,
                    img: "https://www.fotoprizer.ru/img_inf/st_221.jpg"
                },
            ],

        },
        dialogsPage: {
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
            ],
            messages: [
                {id: 1, message: "How are you?"},
                {id: 2, message: "Hello"},
                {id: 3, message: "Yo"},
            ],
            newMessageText: " "
        },

    },
    _onChange() {
        console.log("State is changed")
    },


    subscribe(callback: any) {
        this._onChange = callback
    },
    getState() {
        return this._state
    },
    dispatch(action:any) {  // {Type: "ADD-POST"}
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._onChange() // на подобие subscrybe, уведомили подписчика об изменениях
    }
}

//@ts-ignore
window.store = store

// export default store;
*/

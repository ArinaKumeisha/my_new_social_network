import React from 'react';
import s from "./Dialogs.module.css"
import {DialogsPropsType} from "./DialogsContainer";
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Textarea} from "../../assets/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

let maxLength15 = maxLengthCreator(100)

export function Dialogs(props: DialogsPropsType) {
    let addNewMessageBody = (data: FormMessageType) => {
        props.sendNewMessage(data.newMessageBody)
    }
    let dialogs = props.dialogsPage.dialogs
    let messages = props.dialogsPage.messages
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {
                    dialogs.map(d => {
                        return (
                            <div className={s.dialog + " " + s.active}>
                                {d.name}
                                <img src={d.img} alt={'people'}/>
                            </div>)
                    })}
            </div>
            <div className={s.messages}>
                {
                    messages.map(m => {
                        return (
                            <div key={m.id}
                                 className={s.dialog}>
                                {m.message}
                            </div>)
                    })}
                <AddMessageReduxForm onSubmit={addNewMessageBody}/>
            </div>
        </div>
    )
}

type FormMessageType = {
    newMessageBody: string
}
export const AddMessageForm = (props: InjectedFormProps<FormMessageType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder={'Enter your message'}
                   name='newMessageBody'
                   component={Textarea}
                   type={'text'}
                   validate={[required, maxLength15,]}/>
            <button>Send</button>
        </form>
    )
}

export const AddMessageReduxForm = reduxForm<FormMessageType>({
    form: 'dialogs'
})(AddMessageForm)
export default Dialogs;


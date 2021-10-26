import {useDispatch, useSelector} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {AppStateType} from '../../redux/redux_store';
import {addNewMessageForm} from './new-reducer';


const NewForm = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state: AppStateType) => state.new.messageForState)


    let addMessageForm = (values: any) => {
        dispatch(addNewMessageForm(values.inputform))
    }
    return (
        <div>
            {selector.map(s => {
                return <div key={s.id}>{s.message}</div>
            })}
            <NewReduxForm onSubmit={addMessageForm}/>
        </div>)
}
const NewComponentForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                component="input"
                name="inputform"
            />
            <button>Add New</button>
        </form>
    )
}

const NewReduxForm = reduxForm({form: 'newForm'})(NewComponentForm)
export default NewForm;
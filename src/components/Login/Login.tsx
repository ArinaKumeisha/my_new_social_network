import React from 'react';
import {connect, ConnectedProps, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Input} from "../../assets/FormsControls";
import {login} from '../../redux/auth-reducer';
import {AppStateType} from '../../redux/redux_store';
import {maxLengthCreator, required} from "../../utils/validators/validators";
import s from '../../assets/FormsControls.module.css'

type FormDataType = {
    password: string
    rememberMe: boolean
    email: string
}
const Login = (props: LoginPropsType) => {
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)

    const onSubmit = (data: FormDataType,) => {
        props.login(data.password, data.email, data.rememberMe);
    }
    if (isAuth) {
        return <Redirect to={'/profile'}/>;
    }
    return (
        <div>
            <h1><i>{'Login'}</i></h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
};
const maxLength12 = maxLengthCreator(30)
export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = props => {
    const {handleSubmit,error } = props
    return (
        <form onSubmit={handleSubmit}>
            <i>Login</i>
            <Field
                component={Input}
                name={'password'}
                type='text'
                validate={[required, maxLength12,]}/>
            <i>Password</i>
            <Field
                component={Input}
                name={'email'}
                type="password"
                placeholder={'Password'}
                validate={[required, maxLength12,]}/>
            <i>remember me</i>
            <Field
                component={'input'}
                name={'remember me'}
                type={'checkbox'}
            />
            {error && <div className={s.commonError}>
                {error}
            </div>
            }

            <button>Login</button>

        </form>

    );
}
const LoginReduxForm = reduxForm
<FormDataType>({
    // a unique name for the form
    form: 'login'
})(LoginForm)

    const connector = connect(null, {login})
    type LoginPropsType = ConnectedProps <typeof connector>;
        export default connector(Login);


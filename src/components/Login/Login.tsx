import React from 'react';
import {connect, ConnectedProps, useDispatch, useSelector} from 'react-redux';
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
    captcha: string | null
}
const Login = (props: LoginPropsType) => {
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)
    const dispatch = useDispatch()

    const onSubmit = (data: FormDataType,) => {
        dispatch(login(data.email, data.password, data.rememberMe, data.captcha))

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
    const captchaUrl = useSelector<AppStateType, string | null>(state => state.auth.captchaUrl)
    const {handleSubmit, error} = props
    return (
        <form onSubmit={handleSubmit}>
            <i>Login</i>
            <Field
                component={Input}
                name={'email'}
                type='email'
                validate={[required, maxLength12,]}/>

            <i>Password</i>
            <Field
                component={Input}
                name={'password'}
                type='password'
                validate={[required, maxLength12,]}/>

            <i>remember me</i>
            <Field
                component={'input'}
                name={'remember me'}
                type={'checkbox'}
            />
            {captchaUrl  && <img src={captchaUrl}/>}
            {captchaUrl  &&
            <Field
                component={Input}
                name={'captcha'}
                type={'text'}
            />}

            {error && <div className={s.commonError}>
                {error}
            </div>
            }
            <button>Login</button>
        </form>

    );
}
const LoginReduxForm = reduxForm
    < FormDataType > ({
        // a unique name for the form
        form: 'login'
    })(LoginForm)

const connector = connect(null, {login})
type LoginPropsType = ConnectedProps<typeof connector>;
export default connector(Login);

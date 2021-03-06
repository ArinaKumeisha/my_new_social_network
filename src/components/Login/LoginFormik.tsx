import React from 'react'
import {useFormik} from 'formik';
import {connect, ConnectedProps, useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {AppStateType} from "../../redux/redux_store";
import {login} from "../../redux/auth-reducer";
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


type FormDataType = {
    email?: string
    password?: string
    rememberMe?: boolean
    captcha?: string | null
}

const validate = (values: FormDataType) => {
    let errors: FormDataType = {};
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length > 15) {
        errors.password = 'Must be 15 characters or less';
    } else if (values.password.length < 7) {
        errors.password = 'Must be 7 characters or less';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};


export const LoginFormik = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)
    const captchaUrl = useSelector<AppStateType, string | null>(state => state.auth.captchaUrl)
    const messageError = useSelector<AppStateType, string | null>(state => state.auth.messageError)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: '',

        }, validate,
        onSubmit: values => {
            dispatch(login(values.email, values.password, values.rememberMe, values.captcha));
            formik.resetForm()
            console.log(values)
        },
    })
    if (isAuth) {
        return <Redirect to={'/profile'}/>;
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <a href={'https://social-network.samuraijs.com/'}>
                        </a>

                    </FormLabel>
                    <FormGroup>
                        <TextField
                            id="email"
                            type="email"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ?
                            <div style={{color: 'red'}}>{formik.errors.email}</div> : null}

                        <TextField
                            id="password"
                            type="password"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ?
                            <div style={{color: 'red'}}>{formik.errors.password}</div> : null}

                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox/>}
                            name="rememberMe"
                            onChange={formik.handleChange}
                            checked={formik.values.rememberMe}
                        />

                        {captchaUrl && <img src={captchaUrl}/>}
                        {captchaUrl && <TextField
                            id="captcha"
                            type="captcha"
                            {...formik.getFieldProps('captcha')}
                        />}
                        {messageError !== null && <div style={{color: 'red'}}>{messageError}</div>}

                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
/*const mapStateToProps = (state: AppStateType) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth,
})

const connector = connect(mapStateToProps, {login})
type  CommonType = ConnectedProps <typeof connector>
export default connector(LoginFormik);*/

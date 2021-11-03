import React from 'react';
import {Field, Form, Formik,} from 'formik';
import {ProfilesType} from "../../../../types/types";
import * as Yup from 'yup';
import s from '../../../../assets/common/common.module.css'


type PropsType = {
    isOwner: boolean
    profile: ProfilesType
    userId: string
    saveProfile: (profile: ProfilesType) => void
    activateEditeMode: (editMode: boolean) => void
    error: string | null
}
const ProfileDataForm = (props: PropsType) => {

    const submit = async (values: ProfilesType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        await props.saveProfile(values)
        {
            if (props.error !== null)
                props.activateEditeMode(true)
            setSubmitting(true)
        }
        props.activateEditeMode(false)
    }

    const SignupSchema = Yup.object().shape({
        fullName: Yup.string()
            .min(2, 'To short')
            .max(50, 'Too Long!')
            .required('Required, enter correct value'),
        lookingForAJobDescription: Yup.string()
            .min(2, 'To short')
            .max(50, 'Too Long!')
            .required('Required, enter correct value'),
        aboutMe: Yup.string()
            .min(2, 'To short')
            .max(50, 'Too Long!'),
    });
    const contacts: any = props.profile.contacts
    return (
        <div>
            <Formik
                initialValues={{
                    fullName: '',
                    lookingForAJobDescription: '',
                    lookingForAJob: false,
                    aboutMe: '',
                    userId: props.userId,
                    contacts: {
                        facebook: '',
                        youtube: '',
                        website: '',
                        vk: '',
                        twitter: '',
                        mainLink: '',
                        instagram: '',
                        github: ''
                    },
                    photos: {small: '', large: ''}
                }}
                onSubmit={submit}
                validationSchema={SignupSchema}
            >
                {({errors, touched, isSubmitting}) => (
                    <Form>
                        <div className={s.error}>{props.error}</div>

                        <Field type="text" name="fullName" placeholder="Full Name"/>
                        {errors.fullName && touched.fullName ? (
                            <div>{errors.fullName}</div>) : null}

                        <Field type="text" name="lookingForAJobDescription" placeholder={"My professional skills"}/>
                        {errors.lookingForAJobDescription && touched.lookingForAJobDescription ? (
                            <div>{errors.lookingForAJobDescription}</div>) : null}

                        <div className={s.checkBox}> Looking for a job?
                            <Field type="checkbox" name="lookingForAJob"
                            />
                        </div>
                        <Field type="text" name="aboutMe" placeholder="aboutMe"/>
                        {errors.aboutMe && touched.aboutMe ? (
                            <div>{errors.aboutMe}</div>) : null}

                        {Object.keys(contacts).map(c => {
                            return (
                                <Field key={c} type="text"
                                       name={`contacts.${c}`}
                                       placeholder={`${c}`}/>
                            )
                        })}

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}


/*   const formik = useFormik(
{
    initialValues: {
        fullName: '',
            lookingForAJob
    :
        false,
            lookingForAJobDescription
    :
        '',
            aboutMe
    :
        '',
            contacts
    :
        {
            facebook: '',
                github
        :
            '',
                instagram
        :
            '',
                mainLink
        :
            '',
                twitter
        :
            '',
                vk
        :
            '',
                website
        :
            '',
                youtube
        :
            ''
        }
    ,
        photos:{
            large: null, small
        :
            null
        }
    ,
        userId: ''
    }
,
    onSubmit: (values: ProfilesType) => {
        props.saveProfile(values)
        // alert(JSON.stringify(values))
    },
}
);
return (
<form onSubmit={formik.handleSubmit}>
    <label htmlFor="fullName">FullName</label>
    <input
        id="fullName"
        name="fullName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.fullName}
    />

    <label htmlFor="fullName">lookingForAJobDescription</label>
    <input
        id="lookingForAJobDescription"
        name="lookingForAJobDescription"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lookingForAJobDescription}
    />
    <label htmlFor="aboutMe">aboutMe</label>
    <input
        id="aboutMe"
        name="aboutMe"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.aboutMe}
    />

    <button type="submit">Submit</button>
</form>
);*/


export default ProfileDataForm;
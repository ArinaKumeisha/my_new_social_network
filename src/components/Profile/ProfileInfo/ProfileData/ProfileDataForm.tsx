import React from 'react';
import {ProfilesType} from "../../../../types/types";
import s from "./ProfileData.module.css";
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
} from 'formik';

interface MyFormValues {
    firstName: string;
}

type PropsType = {
    isOwner: boolean
    profile: ProfilesType
}
const ProfileDataForm = (props: PropsType) => {
    const {isOwner, profile} = props
    const initialValues: MyFormValues = { firstName: '' };
    return (
        <div>
            <h1>My Example</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    console.log({ values, actions });
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }}
            >
                <Form>
                    <label htmlFor="firstName">First Name</label>
                    <Field id="firstName" name="firstName" placeholder="First Name" />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
};

export default ProfileDataForm;
import {Field, Form, Formik} from "formik";
import React from "react";

type PropsType = {
    onFilterChanged: (filter: any) => void
}

type FriendsType = "null" | "true" | "false"
type FormType = {
    term: string
    friend: FriendsType
}
const validateForm = (values: any) => {
    const errors = {};
    return errors
}


export const UsersSearchForm: React.FC<PropsType> = React.memo(props => {

    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        (props.onFilterChanged(values))
        setSubmitting(false)
    }

    return (
        <>
            <Formik
                initialValues={{term: '', friend: 'null'}}
                validate={validateForm}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="term"/>
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>

                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    )
})

import React from 'react';
import s from './FormsControls.module.css'

export const Input = (props: any) => {
    const {input, meta} = props
    const hasError = meta.touched && meta.error
    return (
        <div className={s.container}>
            <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
                <input {...input}/>
                {hasError && <span className={`${s.formControl} ${s.error}`}>{meta.error}</span>}
            </div>
        </div>
    );
};
export const Textarea = (props: any) => {
    const {input, meta} = props
    const hasError = meta.touched && meta.error
    return (
        <div className={s.container}>
            <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
                <textarea {...input}{...props}/>
                {hasError && <span className={`${s.formControl} ${s.error}`}>{meta.error}</span>}
            </div>
        </div>
    );
};


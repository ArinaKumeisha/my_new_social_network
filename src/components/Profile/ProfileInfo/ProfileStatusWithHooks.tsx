import React, {ChangeEvent, useEffect, useState} from 'react';

export type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}
export const ProfileStatusWithHooks = (props: ProfileStatusType) => {
    const [editMode, setEditeMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)

    const activeMode = () => {
        setEditeMode(true)
    }
    const deactiveMode = () => {
        setEditeMode(false)
        props.updateStatus(status)

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    return (
        <>
            {editMode ?
                <div><input value={status}
                            onChange={onChangeHandler}
                            onBlur={deactiveMode}
                            autoFocus/></div>
                :
                <div>
                    <h3><i
                        onDoubleClick={activeMode}>{props.status || '-----'}
                    </i></h3>
                </div>
            }
        </>

    )
}

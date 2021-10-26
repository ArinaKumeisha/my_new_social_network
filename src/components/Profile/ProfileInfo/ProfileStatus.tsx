import React, {ChangeEvent} from 'react';

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}
type StateType = {
    editMode: boolean
    status: string
}

export class ProfileStatus extends React.Component<ProfileStatusType,StateType> {
    state = {
        editMode: false,
        status: this.props.status,
    }

    activateMode = () => {
        this.setState({
            editMode: true
        })
    }
    deActivateMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <>      {!this.state.editMode ?
                <div>
                    <span
                        onDoubleClick={this.activateMode}>
                        {this.props.status || "-------"}
                    </span>
                </div> :
                <div>
                    <input
                        onChange={this.onStatusChange}
                        value={this.state.status}
                        autoFocus
                        onBlur={this.deActivateMode}/>
                </div>}
            </>
        )
    }
};


import React from 'react';
import Profile from "./Profile";
import {AppStateType} from "../../redux/redux_store";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {setUserProfile, getUserStatus, updateStatus} from "../../redux/profile-reducer";
import {compose} from "redux";
import { withAuthRedirect } from '../../hoc/WithAuthRedirects';
import { ProfilesType } from '../../types/types';
import {getProfile, getStatus, getIsAuth, getId} from '../../redux/select'

type PathParamsType = {
    userId: string
}
export type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType
type ProfilePropsType = mapStateToPropsType & mapDispatchToPropsType

class ProfileContainer extends React.Component <PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.id
            if(!userId){
                this.props.history.push('/login')
            }
        }
        this.props.setUserProfile(userId)
        this.props.getUserStatus(userId)
    }

    render() {
        return (
            <Profile
                {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}/>
        )
    }
}
type mapStateToPropsType = {
    profile: ProfilesType | null
    status: string
    id: string
    isAuth: boolean
}
type mapDispatchToPropsType = {
    setUserProfile: (userId: string) => void
    getUserStatus: (userId: string) => void
    updateStatus: (status: string) => void
}
let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        profile: getProfile(state),
        status: getStatus(state),
        isAuth: getIsAuth(state),
        id: getId(state),
    }
}
export default compose<React.ComponentType>(
    connect(mapStateToProps, {setUserProfile, getUserStatus, updateStatus}),
    withRouter,
    withAuthRedirect,
)(ProfileContainer)


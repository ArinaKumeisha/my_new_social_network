import React from 'react';
import Profile from "./Profile";
import {AppStateType} from "../../redux/redux_store";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {getUserStatus, savePhoto, setUserProfile, updateStatus} from "../../redux/profile-reducer";
import {compose} from "redux";
import {withAuthRedirect} from '../../hoc/WithAuthRedirects';
import {PhotosType, ProfilesType} from '../../types/types';
import {getId, getIsAuth, getProfile, getStatus} from '../../redux/select'

type PathParamsType = {
    userId: string
}
export type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType
type ProfilePropsType = mapStateToPropsType & mapDispatchToPropsType

class ProfileContainer extends React.Component <PropsType> {
    refreshProfile() {
        let userId = this.props.match.params.userId; // чужая страница
        if (!userId) {
            userId = this.props.id
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.setUserProfile(userId)
        this.props.getUserStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId)
            this.refreshProfile()
    }

    render() {
        return (
            <Profile
                {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                isOwner={!this.props.match.params.userId}
                savePhoto={this.props.savePhoto}
            />
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
    savePhoto: (image: PhotosType) => void
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
    connect(mapStateToProps, {setUserProfile, getUserStatus, updateStatus, savePhoto}),
    withRouter,
    withAuthRedirect,
)(ProfileContainer)



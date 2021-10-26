import React from 'react';
import {connect} from "react-redux";
import {follow, requestUsers, setCurrentPage, toggleIsFollowingProgress, unFollow,} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux_store";
import Preloader from "../preloader/preloader";
import {compose} from "redux";
import {Users} from "./Users";
import {UserType} from '../../types/types';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from '../../redux/select';

class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        const {currentPage,pageSize } = this.props
        this.props.requestUsers(currentPage, pageSize);
    }

    onPageHandler = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.requestUsers(pageNumber, pageSize)
    }

    render() {
        const {isFetching}=this.props;
        return (
            <>    {isFetching ? <Preloader/> : null}
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    unFollow={this.props.unFollow}
                    follow={this.props.follow}
                    users={this.props.users}
                    onPageHandler={this.onPageHandler}
                    followingInProgress={this.props.followingInProgress}
                />
            </>
        )
    }
}

export type UsersPropsType = MapDispatchToPropsType & MapStateToPropsType

export type MapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}
export type MapDispatchToPropsType = {
    follow: (userID: number) => void,
    unFollow: (userID: number) => void,
    setCurrentPage: (currentPage: number) => void
    requestUsers: (currentPage: number, pageSize: number) => void
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        follow,      // подразумевает follow: follow, где второе follow - это санки
        unFollow,
        setCurrentPage,
        toggleIsFollowingProgress,
        requestUsers: requestUsers
    }),
)(UsersContainer)




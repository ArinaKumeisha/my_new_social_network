import React from 'react';
import Header from "./Header";
import {AppStateType} from "../../redux/redux_store";
import {logOut} from "../../redux/auth-reducer";
import {getIsAuth, getLogin} from '../../redux/select'
import {connect, ConnectedProps} from "react-redux";

class HeaderContainer extends React.Component<connectorType> {

    render() {
        return (
            <Header
                {...this.props}
                isAuth={this.props.isAuth}
                login={this.props.login}/>

        )
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: getIsAuth(state),
        login: getLogin(state),
    }
}

const connector = connect(mapStateToProps,  {logOut})
type connectorType = ConnectedProps<typeof connector>
export default connector(HeaderContainer)
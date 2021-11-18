import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Music";
import HeaderContainer from "./components/Header/HeaderContainer";
import UsersContainer from "./components/Users/UsersContainer";
import NewForm from './components/New/New';
import {AppStateType} from './redux/redux_store';
import Preloader from './components/preloader/preloader';
import {inicializedApp} from './redux/app-reducer'
import {Route, Redirect, Switch} from 'react-router';
import {connect, ConnectedProps} from 'react-redux';
import {WithSuspense} from "./hoc/WithSuspense";
import {LoginFormik} from "./components/Login/LoginFormik";
import ProfileContainer from "./components/Profile/ProfileContainer";


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

class App extends React.Component<ConectedType> {

    componentDidMount() {
        this.props.inicializedApp()
    }
    render() {
        if (!this.props.inicialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Switch>
                        <Route exact path="/" render={() =><ProfileContainer/>}/>
                    <Route exact path="/profile" render={() =><ProfileContainer/>}/>
                    <Route path="/dialogs"
                           render={WithSuspense(DialogsContainer)}/>
                    <Route path="/users" render={() =>
                        <UsersContainer/>}/>
                    <Route path="/new" render={() => <NewForm/>}/>
                    <Route path="/music" component={Music}/>
                    <Route path="/settings" component={Settings}/>
                    <Route path="/friends" render={() => <div>Friends</div>}/>
                    <Route path="/login" component={LoginFormik}/>
                    <Route path="*" render={() => <h2 style={{color:'red'}}>404 PAGE NOT FOUND</h2>}/>
                    </Switch>
                </div>
            </div>)
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        inicialized: state.app.inicialized,
    }
}
let connector = connect(mapStateToProps, {inicializedApp})
type ConectedType = ConnectedProps<typeof connector>
export default connector(App)



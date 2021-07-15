import './App.css';
import React from "react"
import { Redirect, Route, Switch } from 'react-router';
import { connect } from "react-redux"

import ResponsiveDrawer from './components/Drawer.component';
import AllTasks from './pages/AllTasks.page';
import CreateNewTask from "./pages/CreateNewTask.page"
import Login from "./pages/Login.page"
import Details from "./pages/Details.page"
import PendingTasks from './pages/PendingTasks.page';
import MyTasks from './pages/MyTasks.page';
import SnackBar from "./components/SnackBar.component"

function App({userToken}) {
    return (
        <div style={{backgroundColor: "#f0f2f5", minHeight:"100vh", minWidth:"100vw", position: "absolute", color: "indigo"}}>
                <SnackBar/>
            
            <Switch>
                <Route path="/login" exact>
                    <Login />
                </Route>
                {
                    userToken ?
                    (<ResponsiveDrawer>
                        <Route path="/" exact>
                            <AllTasks />
                        </Route>
                        <Route path="/mytasks" exact>
                            <MyTasks />
                        </Route>
                        <Route path="/pendingtasks" exact>
                            <PendingTasks />
                        </Route>
                        <Route path="/newtask" exact>
                            <CreateNewTask />
                        </Route>
                        <Route path="/details/:id" exact>
                            <Details />
                        </Route>
                    </ResponsiveDrawer> ) :
                    (<Redirect to="/login"/> )  
                }
            </Switch>
        </div>

    );
}

const mapStateToProps = state => ( {
    userToken: state.userInfo.userToken
})
export default connect(mapStateToProps)(App);

import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import SideDrawer from './components/layout/SideDrawer';
import Backdrop from './components/layout/Backdrop';
import Details from './components/submissions/Details';
import CreateNew from './components/submissions/CreateNew';
import Edit from './components/submissions/Edit';
import prevDashboard from './components/dashboard/prevDashboard';

class App extends Component {
    state = {
        sideDrawerOpen: false
    }
    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerOpen : !prevState.sideDrawerOpen};
        });
    }
    backdropClickHandler = () =>{
        this.setState({sideDrawerOpen: false});
    }
    render() {
        let backdrop;
        if(this.state.sideDrawerOpen){
            backdrop = <Backdrop click={this.backdropClickHandler} />;
        }
        return (
            <BrowserRouter>
                <div className="App">
                    <Navbar click={this.drawerToggleClickHandler} />
                    <Switch>
                        <Route exact path='/' component={Dashboard} />
                        <Route path='/submission/:id' component={Details} />
                        <Route path='/create' component={CreateNew} />
                        <Route path='/edit/:id' component={Edit} />
                        <Route path='/previous' component={prevDashboard} />
                    </Switch>
                    <SideDrawer show={this.state.sideDrawerOpen} closeit={this.backdropClickHandler} />
                    {backdrop}
                </div>
            </BrowserRouter>
        );
    }
}

export default App;

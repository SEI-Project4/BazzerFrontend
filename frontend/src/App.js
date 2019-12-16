import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css'
import Testing from './components/Testing/Testing'
import ProfilePage from './components/ProfilePage/ProfilePage'
import PostReady from './components/PostPage/PostReady'
import CreatePost from './components/PostPage/CreatePost'
import HomePage from './components/HomePage/HomePage'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'

export default class App extends Component {
  render() {
    return (
      <div className="body">
        <Router>
          <NavBar/>
          <Switch>
        <Route
            
            path="/home"
            render={props => (
              <HomePage
                {...props}
              />
            )}
        />
        <Route
            
            path="/profile"
            render={props => (
              <ProfilePage
                {...props}
              />
            )}
        />
        <Route
            
            path="/post"
            render={props => (
              <PostReady
                {...props}
              />
            )}
        />
        <Route
            
            path="/create"
            render={props => (
              <CreatePost
                {...props}
              />
            )}
        />
     </Switch>
     
     <Route
        exact
        path="/login"
        render={props => (
          <SignIn
            {...props}
            />
            )}
        />
        <Route
            
            path="/register"
            render={props => (
              <SignUp
                {...props}
              />
            )}
        />
        <Footer/>
      </Router> 
      </div>
    )
  }
}


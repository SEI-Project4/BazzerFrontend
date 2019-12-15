import React, { Component } from 'react'
import './App.css'
import Testing from './components/Testing/Testing'
import ProfilePage from './components/ProfilePage/ProfilePage'
import PostReady from './components/PostPage/PostReady'
import EditProfile from './components/ProfilePage/EditProfile'
import CreatePost from './components/PostPage/CreatePost'
import HomePage from './components/HomePage/HomePage'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'

export default class App extends Component {
  render() {
    return (
      <div className="body">
        <ProfilePage/>
      </div>
    )
  }
}


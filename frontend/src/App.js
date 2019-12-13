import React, { Component } from 'react'
import Testing from './components/Testing/Testing'
import ProfilePage from './components/ProfilePage/ProfilePage'
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div className="body">
        <ProfilePage/>
      </div>
    )
  }
}


import React from 'react'
import { Routes ,Route } from 'react-router-dom'
import Nav from './components/Nav'
import HomePage from './pages/HomePage'
import SettingPage from './pages/SettingPage'
import SignUpPage from './pages/SignUpPage'
import LogInPage from './pages/LogInPage'
import ProfilePage from './pages/ProfilePage'

const App = () => {
  return (
  <div>
   <Nav/>
   <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/signup' element={<SignUpPage/>}/>
    <Route path='/login' element={<LogInPage/>}/>
    <Route path='/setting' element={<SettingPage/>}/>
    <Route path='/profile' element={<ProfilePage/>}/>
   </Routes>
  </div>
  )
}

export default App


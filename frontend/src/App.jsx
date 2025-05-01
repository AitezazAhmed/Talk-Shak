import React, { useEffect } from 'react'
import { Routes ,Route, Navigate  } from 'react-router-dom'
import Nav from './components/Nav'
import HomePage from './pages/HomePage'
import SettingPage from './pages/SettingPage'
import SignUpPage from './pages/SignUpPage'
import LogInPage from './pages/LogInPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/UseAuthStore'
import {useThemeStore } from "./store/useThemeStore";
import { Loader } from "lucide-react";
import {Toaster} from "react-hot-toast"

const App = () => {
  const { theme } = useThemeStore();

  const {authUser,checkAuth,isCheckingAuth,onlineUsers}=useAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
  <div data-theme={theme}>
 <Nav/>
   <Routes>
    <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />}/>
    <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/" />}/>
    <Route path='/login' element={!authUser ? <LogInPage /> : <Navigate to="/" />} />
    <Route path='/setting' element={<SettingPage/>}/>
    <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login"/> }/>
   </Routes> 
   <Toaster />
  </div>

  )
}

export default App


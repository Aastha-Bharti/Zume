import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import UserProvider from './context/UserContext'

const App = () => {
  return (
    
    <UserProvider >
        <Routes>
          <Route path='/' element= { <LandingPage/> }/>
        </Routes>
    </UserProvider>
  )
}

export default App
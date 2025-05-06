import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders' // Keep the import
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './components/Home'

export const backendUrl = "http://localhost:3000"

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className="container-fluid p-0 m-0">
      <ToastContainer />
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Sidebar setToken={setToken} />

          {/* Main Content */}
          <div
            style={{
              marginLeft: '250px', // same as sidebar width
              minHeight: '100vh',
              padding: '20px',
            }}
          >
            <Routes>
            <Route path="/" element={<Home/>} />
              <Route path="/add" element={<Add token={token} />} />
              <Route path="/list" element={<List token={token} />} />
              <Route path="/orders" element={<Orders token={token} />} /> {/* Pass token prop here */}
            </Routes>
          </div>
        </>
      )}
    </div>
  )
}

export default App

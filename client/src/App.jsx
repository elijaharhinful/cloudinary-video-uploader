import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, Outlet } from 'react-router-dom'

function App() {

  return (
    <div className='App'>
      <h1>Upload files using Cloudinary Services MERN stack project</h1>
      <Link to="/">Home</Link> | <Link to="upload">Upload</Link> | <Link to="secure-upload">Secure upload</Link>
      <br></br>
      <br></br>
      <Outlet />
    </div>
  )
}

export default App


import React from "react";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import SecureUpload from './Components/SecureUpload.jsx';
import Upload from './Components/Upload.jsx';

// Configure nested routes with JSX
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="upload" element={<Upload />} />
      <Route path="secure-upload" action={<SecureUpload />} />
    </Route>
  )
);



ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

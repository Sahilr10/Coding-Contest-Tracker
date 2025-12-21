import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/Profile.jsx'

import './index.css'
import App from './App.jsx'
import NotFound from './pages/NotFound.jsx'
import ContestContextProvider from './context/ContestContextProvider.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/login",
        element: <Login/>,
        
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/profile",
        element: <Profile/>
      },{
        path: "*",
        element: <NotFound/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContestContextProvider>
      
        <RouterProvider router={router}/>
      
    </ContestContextProvider>
  </StrictMode>,
)

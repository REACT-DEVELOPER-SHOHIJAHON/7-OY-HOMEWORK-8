import React from 'react'
import { useRoutes } from 'react-router-dom'
import Home from "./Home"
import Login from "./Login"

const RouterController = () => {
  return useRoutes([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/login",
        element: <Login/>,
    }
  ])
}

export default RouterController
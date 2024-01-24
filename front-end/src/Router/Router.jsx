import {createBrowserRouter } from "react-router-dom";
import Routes from "../Routes/Routes";
import Home from "../Pages/Home/Home";
import MyProperties from "../Pages/Dashboard/MyProperties";
import DashboardOutlet from "../Pages/Dashboard/DashboardOutlet/DashboardOutlet";
import Login from "../Pages/Form/Login/login";
import SignUp from "../Pages/Form/SignUp/SignUp";

const Router = createBrowserRouter([
    {
        path:'/',
        element: <Routes></Routes>,
        children:[
           {
            path:'/',
            element:<Home></Home>
           },
           {
            path:'/login',
            element:<Login></Login>
           },
           {
            path:'/sign-up',
            element:<SignUp></SignUp>
           },

        ]
    },
    {
        path:'/dashboard',
        element:<DashboardOutlet></DashboardOutlet>,
        children:[
            {
                path:'/dashboard/my-properties',
                element:<MyProperties></MyProperties>
            }
        ]

    },
    

])


export default Router;

import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../mainlayout/MainLayOut";
import NotFound from "../pages/NotFound";
import Register from "../signin/Register";
import Login from "../signin/Login";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../../src/router/PrivateRoute";




const myRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainLayOut></MainLayOut>,
        errorElement: <NotFound></NotFound>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
    }
])

export default myRouter;
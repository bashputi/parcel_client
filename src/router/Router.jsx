import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../mainlayout/MainLayOut";
import NotFound from "../pages/NotFound";
import Register from "../signin/Register";
import Login from "../signin/Login";




const myRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainLayOut></MainLayOut>,
        errorElement: <NotFound></NotFound>,
        children: [
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
        ]
    }
])

export default myRouter;
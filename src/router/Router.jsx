import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../mainlayout/MainLayOut";
import NotFound from "../pages/NotFound";



const myRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainLayOut></MainLayOut>,
        errorElement: <NotFound></NotFound>,
    }
])

export default myRouter;
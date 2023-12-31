import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../mainlayout/MainLayOut";
import NotFound from "../pages/NotFound";
import Register from "../signin/Register";
import Login from "../signin/Login";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../../src/router/PrivateRoute";
import Adminhome from "../pages/Admin/Adminhome";
import Deliveryman from "../pages/Admin/Deliveryman";
import Allparcel from "../pages/Admin/Allparcel";
import Allusers from "../pages/Admin/Allusers";
import Bookparcel from "../pages/user/Bookparcel";
import Myparcel from "../pages/user/Myparcel";
import MyProfile from "../pages/user/MyProfile";
import MyDeliveryList from "../pages/deliveryman/MyDeliveryList";
import MyReview from "../pages/deliveryman/MyReview";
import UpdateItem from "../pages/user/UpdateItem";
import Payment from "../pages/user/Payment";
import PaymentSuccess from "../pages/user/PaymentSuccess";

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "adminhome",
        element: <Adminhome></Adminhome>,
      },
      {
        path: "allusers",
        element: <Allusers></Allusers>,
        loader: () => fetch("https://parcel-delivery-server.vercel.app/users"),
      },
      {
        path: "allparcel",
        element: <Allparcel></Allparcel>,
        loader: () => fetch("https://parcel-delivery-server.vercel.app/books"),
      },
      {
        path: "deliveryman",
        element: <Deliveryman></Deliveryman>,
        loader: () => fetch("https://parcel-delivery-server.vercel.app/users"),
      },
      {
        path: "bookparcel",
        element: <Bookparcel></Bookparcel>,
      },
      {
        path: "myparcel",
        element: <Myparcel></Myparcel>,
        loader: () => fetch("https://parcel-delivery-server.vercel.app/books"),
      },
      {
        path: "updateItem/:id",
        element: <UpdateItem></UpdateItem>,
        loader: ({ params }) =>
          fetch(`https://parcel-delivery-server.vercel.app/books/${params.id}`),
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "payment/paymentsuccess",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "mydeliverylist",
        element: <MyDeliveryList></MyDeliveryList>,
        loader: () => fetch("https://parcel-delivery-server.vercel.app/books"),
      },
      {
        path: "myreview",
        element: <MyReview></MyReview>,
        loader: () =>
          fetch("https://parcel-delivery-server.vercel.app/ratings"),
      },
    ],
  },
]);

export default myRouter;

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "../components/header/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";


const Dashboard = () => {
    return (
        <div className="relative container mx-auto min-h-screen md:flex">
              <Helmet>
                <meta charSet="utf-8" />
                <title>PAKEED | Dashboard </title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <Sidebar></Sidebar>
            <div className="flex-1  md:ml-64">
                <div className="p-5">
                    <Navbar></Navbar>
                    <div className="container mx-auto flex flex-col min-h-[100vh]">
                    <div className="flex-grow"><Outlet ></Outlet></div>
                    <div className="flex-shrink-0"><Footer ></Footer></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
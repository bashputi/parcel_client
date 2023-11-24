import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/header/Navbar";
import Footer from "../components/Footer";


const MainLayOut = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login') || 
    location.pathname.includes('register');
    return (
        <div className="container mx-auto flex flex-col min-h-[100vh]">
        <div className="flex-grow">
        { noHeaderFooter || <Navbar></Navbar>}
           <Outlet></Outlet>
        </div>
           <div className="flex-shrink-0">
           { noHeaderFooter || <Footer></Footer>}
           </div>
       </div>
    );
};

export default MainLayOut;
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";


const Dashboard = () => {
    return (
        <div className="relative container mx-auto min-h-screen md:flex">
            <Sidebar></Sidebar>
            <div className="flex-1  md:ml-64">
                <div className="p-5">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
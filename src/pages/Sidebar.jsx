import { useState } from "react";
// import useRole from "../hooks/useRole";
import Logo from "../components/header/Logo";
import { AiOutlineBars } from 'react-icons/ai'
import { NavLink } from "react-router-dom";



const Sidebar = () => {
  
    const [isActive, setActive] = useState(false);
    // const [role] = useRole();

    // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }

    return (
        <>
        {/* Small Screen Navbar */}
        <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
          <div>
            <div className='block cursor-pointer p-4 font-bold'>
              <Logo />
            </div>
          </div>
          <button
            onClick={handleToggle}
            className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
          >
            <AiOutlineBars className='h-5 w-5' />
          </button>
        </div>
  
        {/* Sidebar */}
        <div
          className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-orange-400 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
            isActive && '-translate-x-full'
          }  md:translate-x-0  transition duration-200 ease-in-out`}
        >
          <div>
            <div>
              <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto'>
                <Logo />
              </div>
            </div>
            <hr />
  
            <div>
                <ul className="menu font-semibold lg:text-lg  uppercase">
                    {/* admin route  */}
                <li>
                    <NavLink to="/dashboard/adminhome">
                    Statistics
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/allusers">
                    All Users
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/allparcel">
                    All Parcels
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/deliveryman">
                    All Delivery Man
                    </NavLink>
                </li>
                
                {/* user route  */}
                <li>
                    <NavLink to="/dashboard/bookparcel">
                    Book a parcel
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/myparcel">
                    my parcel
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/profile">
                    my profile
                    </NavLink>
                </li>
                
                {/* deliveryman route  */}
                <li>
                    <NavLink to="/dashboard/mydeliverylist">
                    my Delivery list
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/myreview">
                    my reviews
                    </NavLink>
                </li>
                </ul>
            </div>
          
          </div>
        </div>
        
      </>
    )
}
export default Sidebar;
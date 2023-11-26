import { Link, NavLink } from "react-router-dom"
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import Profile from "./Profile";
import { FaBell } from "react-icons/fa";
import useBook from "../../hooks/useBook";

const Navbar = () => {
  const [ books ] = useBook();
    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");
    const handleToggle = (e) => {
     if(e.target.checked) {
         setTheme("dark");
     }else{
         setTheme("light");
     }
    };
   useEffect(() => {
     localStorage.setItem("theme", theme);
     const localTheme = localStorage.getItem("theme");
     document.querySelector("html").setAttribute("data-theme", localTheme);
    },[theme]); 

  const { user } = useAuth();

 
    const Navlink = <>
       <li className=" font-semibold"><NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-[#d78131] font-semibold uppercase underline" : "" }>Home</NavLink></li>
       <li className=" font-semibold"><NavLink to="/login" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-[#d78131] font-semibold uppercase underline" : "" }>Login</NavLink></li>
       <li className=" font-semibold"><NavLink to="/dashboard" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-[#d78131] font-semibold uppercase underline" : "" }>Dashboard</NavLink></li>
       <li>
        <Link>
        <div className="indicatorm mt-2 lg:-mt-3">
            <span className="indicator-item badge badge-secondary">{books.length}</span> 
            <FaBell className="w-5 h-5"/>
            </div>
        </Link>
       </li>
  </>

return (
    <div>
         <div className="navbar bg-base-100 shadow-lg mb-8">
        <div className="navbar-start">
            <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {
                Navlink
              }
            </ul>
            </div>
              <Logo></Logo>
              <div className="ml-2 lg:ml-5">
               <label onChange={handleToggle} defaultChecked className="cursor-pointer grid place-items-center">
                <input type="checkbox" value="synthwave" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"/>
                <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
                <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </label>
              </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu lg:text-lg menu-horizontal px-1">
          {Navlink}
          </ul>
        </div>
        <div className="navbar-end">
        {user?.email && <Profile></Profile>}     
    </div>
</div>
    </div>
);
};

export default Navbar;
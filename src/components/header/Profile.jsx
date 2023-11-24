import { Link } from "react-router-dom";
import auth from "../../firebase/firebase.config";
import useAuth from "../../hooks/useAuth";


const Profile = () => {
    const { user, logOut } = useAuth();
    const handleLogOut = () => {
        logOut(auth)
        .then(() => {})
        .catch(error => console.log(error));
    };
   
    return (
        <>
            <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                <img src={user.photoURL} />
                </div>
            </label>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <div className="w-10 ml-20 rounded-full">
                
                </div>
                <div className="my-4 text-center font-semibold text-lg text-green-600 pl-2.5">{user.displayName}</div>
                
                <Link to="/dashboard" ><button className="btn btn-ghost lg:text-lg ml-12 font-semibold">Dashboard</button></Link>
                <button onClick={handleLogOut} className="btn btn-ghost lg:text-lg font-semibold">LogOut</button>
               

            </ul>
            </div>
                
        </>
    );
};

export default Profile;
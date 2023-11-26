
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import { Avatar } from "@mui/material";


const Google = () => {
    const from = location.state?.from?.pathname || "/";
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
         .then(result => {
            console.log(result.user);
            const userInfo = {
                 email: result.user?.email,
                 name: result.user?.displayName,
                 role: "user"
              }
              axiosPublic.post('/users', userInfo)
              .then(res => {
                console.log(res.data);
                navigate(from, { replace: true });
              })
         })
    };

    return (
        <div>
            <div className="divider w-2/3 mx-auto"></div>
            <button onClick={handleGoogleSignIn} className="btn btn-ghost mx-14 mb-5">
            <Avatar sx={{ bgcolor: 'primary.main' }}>
                <GoogleIcon /> 
                </Avatar>
                SignUp with Google
            </button>
        </div>
    );
};

export default Google;
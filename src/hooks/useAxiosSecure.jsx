import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5002'
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    axiosSecure.interceptors.response.use(
        function (response) {
          return response;
        },
        async function (error) {
          if (error.response) {
            const status = error.response.status;
            console.log('status error in the interceptor', status);
            if (status === 401 || status === 403) {
              await logOut();
              navigate('/login');
            }
          } else {
            console.log('Error occurred, but no response received.');
            // Handle the situation when error.response is unavailable
            // This might include showing an error message to the user or retrying the request.
          }
          return Promise.reject(error);
        }
      );
      

    return axiosSecure;
};

export default useAxiosSecure;

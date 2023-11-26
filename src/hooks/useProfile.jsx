import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useProfile = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {refetch, data: profile = []} = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/profiles?email=${user.email}`)
           
            return res.data || [];
        }
    })

    return [profile, refetch]
};

export default useProfile;
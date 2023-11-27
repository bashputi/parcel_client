import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useProfile = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useAuth();

    const {refetch, data: profile = []} = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () =>{
            const res = await axiosPublic.get(`/profiles?email=${user.email}`)
           
            return res.data || [];
        }
    })

    return [profile, refetch]
};

export default useProfile;
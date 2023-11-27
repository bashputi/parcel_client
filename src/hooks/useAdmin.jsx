import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isPending: isAdminLoading }  = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`)
            console.log(res.data)
            return res.data?.admin;
        }
    })

    const { data: isDeliveryman, isPending: isDeliverymanLoading }  = useQuery({
        queryKey: [user?.email, 'isDeliveryman'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/users/deliveryman/${user?.email}`)
            console.log(res.data)
            return res.data?.deliveryman;
        }
    })
    const { data: isCommoner, isPending: isCommonerLoading }  = useQuery({
        queryKey: [user?.email, 'isCommoner'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/users/commoner/${user?.email}`)
            console.log(res.data)
            return res.data?.commoner;
        }
    })

    return [isAdmin, isDeliveryman, isCommoner, isAdminLoading, isDeliverymanLoading , isCommonerLoading];
};

export default useAdmin;
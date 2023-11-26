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
            // console.log(res.data)
            return res.data?.admin;
        }
    })

    const { data: isDeliveryman, isPending: isDeliverymanLoading }  = useQuery({
        queryKey: [user?.email, 'isDelivery'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/users/deliveryman/${user?.email}`)
            // console.log(res.data)
            return res.data?.deliveryman;
        }
    })

    return [isAdmin, isDeliveryman, isAdminLoading, isDeliverymanLoading];
};

export default useAdmin;
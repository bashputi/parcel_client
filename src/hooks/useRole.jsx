import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";



const useRole = () => {
    const axiosSecure = useAxiosSecure();
  
    const {refetch, data: role = []} = useQuery({
        queryKey: ['user', 'deliveryman' ],
        queryFn: async () =>{
            const res = await axiosSecure.get('/users?role=deliveryman')
           
            return res.data || [];
        }
    })

    return [role, refetch]
  };

export default useRole;
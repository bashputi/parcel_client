import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "./useAxiosPublic";



const useRole = () => {
    const axiosPublic = useAxiosPublic();
  
    const {refetch, data: role = []} = useQuery({
        queryKey: ['user', 'deliveryman' ],
        queryFn: async () =>{
            const res = await axiosPublic.get('/users?role=deliveryman')
           
            return res.data || [];
            
        }
    })

    return [role, refetch]
  };

export default useRole;
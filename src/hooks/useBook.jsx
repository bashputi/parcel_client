import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useBook = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {refetch, data: book = []} = useQuery({
        queryKey: ['book', user?.email],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/books?email=${user.email}`)
           
            return res.data || [];
        }
    })

    return [book, refetch]
};

export default useBook;
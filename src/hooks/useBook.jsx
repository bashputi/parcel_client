import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";





const useBook = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useAuth();

    const {refetch, data: book = []} = useQuery({
        queryKey: ['book', user?.email],
        queryFn: async () =>{
            const res = await axiosPublic.get(`/books?email=${user.email}`)
           
            return res.data || [];
        }
    })

    return [book, refetch]
};

export default useBook;
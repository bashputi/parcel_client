import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useUsers = (role) => {
  const [axiosPublic] = useAxiosPublic();
    const { isLoading, isError, data: users, refetch } = useQuery(
        ['usersByRole', role],
        async () => {
          try {
            const response = await axiosPublic.get(`/users/role/${role}`);
            return response.data || [];
          } catch (error) {
            throw new Error('Error retrieving users by role');
          }
        }
      );
    
      return {
        isLoading,
        isError,
        users,
        refetchUsersByRole: refetch,
      };
    };


export default useUsers;
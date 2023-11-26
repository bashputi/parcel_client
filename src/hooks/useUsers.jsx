import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";


const useUsers = (role) => {
    const { isLoading, isError, data: users, refetch } = useQuery(
        ['usersByRole', role],
        async () => {
          try {
            const response = await useAxiosSecure.get(`/users/role/${role}`);
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
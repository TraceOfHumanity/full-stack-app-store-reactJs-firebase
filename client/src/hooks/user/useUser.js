import { getAuthenticatedUser } from "api"; 
import { useQuery } from "react-query";

export const useUser = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "user",
    async () => {
      try {
        const userDetail = await getAuthenticatedUser();
        return userDetail;
      } catch (error) {
        console.log(error)
      }
    }, 
    {
      refetchOnWindowFocus: false,
    }
  );

  return { data, isLoading, isError, refetch };
};

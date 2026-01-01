import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { TUserData } from "../types/types"
import { getUser, registerUser } from "../api/auth"


export  function useRegister() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationKey: ['register'],
    mutationFn: (userData: TUserData) => registerUser(userData),
    onSuccess: async () => {
      await queryClient.fetchQuery({
        queryKey: ["user"],
        queryFn: () => getUser(),
      })
    },
  })
}

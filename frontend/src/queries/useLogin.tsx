import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getUser, loginUser, logout } from "../api/auth"
import type { TUserData } from "../types/types"


export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['login'],
    mutationFn: (userData: TUserData) => loginUser(userData),
    onSuccess: async () => {
      await queryClient.fetchQuery({
        queryKey: ["user"],
        queryFn: () => getUser(),
      })
    },
  }
  )
}









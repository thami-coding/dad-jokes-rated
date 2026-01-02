import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../api/auth';

export default function useLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => logout(),
        onSuccess: () => {
            queryClient.setQueryData(["user"], null);
            queryClient.removeQueries({ queryKey: ["user"] });
        },
    });
};
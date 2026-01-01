import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api/auth';

export default function useUser() {
	console.log("userUse");

	return useQuery({
		queryKey: ['user'],
		staleTime: Infinity,
		gcTime: Infinity,
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		queryFn: async () => await getUser()

	})
}

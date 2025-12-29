import { useQuery } from '@tanstack/react-query';

export default function useJokesQuery(pageNumber: number = 1) {
  const { data, isPending, isError, error, fetchStatus } = useQuery({
    queryKey: ['jokes', pageNumber],
    queryFn: async () => {
      const response = await fetch(`https://icanhazdadjoke.com/search?page=${pageNumber}`, { headers: { 'Accept': 'application/json' } })
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      return await response.json()
    }
    , staleTime: Infinity,
  })
  return { data, isPending, isError, error, fetchStatus }
}

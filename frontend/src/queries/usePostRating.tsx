import { useMutation } from "@tanstack/react-query";
import type { RateJokePayload } from "../types/types";

export default function usePostRating() {
  const mutation = useMutation({
    mutationFn: (ratedJoke: RateJokePayload) => {
      const jokeId = ratedJoke.joke_id
      return fetch(`http://localhost:8000/jokes/${jokeId}/rate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ratedJoke)
      })
    },
    mutationKey: ['rate']
  })

  return mutation
}

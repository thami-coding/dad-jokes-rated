import { useMutation } from "@tanstack/react-query";
import type { TRateJokePayload } from "../types/types";
import { rateJoke } from "../api/rating";

export default function usePostRating() {
  return useMutation({
    mutationFn: (ratedJoke: TRateJokePayload) => {
      return rateJoke(ratedJoke);
    }
  })
}

import type { TRateJokePayload } from "../types/types"

export const rateJoke = async (ratedJoke: TRateJokePayload) => {
    const jokeId = ratedJoke.joke_id
    const res = await fetch(`http://localhost:8000/jokes/${jokeId}/rate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(ratedJoke)
    })

    if (!res.ok) {
        throw new Error("Failed To rate joke");
    }
    return await res.json()
}
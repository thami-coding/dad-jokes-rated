import type { TUserData } from "../types/types"

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


export const getUser = async () => {
    const res = await fetch(`http://localhost:8000/users/me`, {
        credentials: "include",
    })
    if (!res.ok) {
        throw new Error(`response status: ${res.status}`);
    }
    return await res.json()
}

export const loginUser = async (userData: TUserData) => {
    const res = await fetch(`http://localhost:8000/login`, {
        method: "POST",
        credentials: "include",
        headers: myHeaders,
        body: JSON.stringify(userData)
    })
    if (!res.ok) {
        throw new Error("Login failed");
    }
    return await res.json()
}


export const registerUser = async (userData: TUserData) => {
    const res = await fetch(`http://localhost:8000/register`, {
        method: "POST",
        credentials: "include",
        headers: myHeaders,
        body: JSON.stringify(userData)
    })
    if (!res.ok) {
        throw new Error("Registering user failed");
    }
    return await res.json()
}

export const logout = async () => {
    const res = await fetch(`http://localhost:8000/logout`, {
        method: "POST",
        credentials: "include",
    })
    if (!res.ok) {
        throw new Error("Logout failed");
    }
    return await res.json()
}

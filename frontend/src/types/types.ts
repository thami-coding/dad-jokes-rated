export type TRateJokePayload = {
    user_id: string;
    joke_id: string;
    rating: number;
};

export type ErrorCardProps = { title: string; message: string }

export type TUserData = {
    id?: string;
    name?: string;
    email: string;
    password?: string
}

export type TFormErrors = {
    name?: string;
    email?: string;
    password?: string;
}

export type TFormType = "login" | "register";
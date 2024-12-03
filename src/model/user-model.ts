export type UserResponse = {
    username: string;
    name: string;
    token?: string;
}

export type UserRequest = {
    username: string;
    name: string;
    password: string;
}
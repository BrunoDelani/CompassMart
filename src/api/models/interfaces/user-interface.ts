export interface IUser {
    email: String,
    password: String
}

export interface IUserAuthenticate {
    email: String,
    password: String,
    token: String
}

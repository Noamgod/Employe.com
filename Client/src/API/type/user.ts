export interface UserClient {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;

}

export interface User extends UserClient {
    role: string;
    jobTitle: string;
    directManager: string;
    description: string;
}

export interface UpdateUser extends User {
    password: string;
}
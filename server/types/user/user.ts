export interface User {
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    phone: string;
}
export interface CreateUser extends User {
    password: string;
}
export interface UpdateUser {
    email?: string;
    role?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    password?: string;
    jobTitle?: string;
    directManager?: string;
    description?: string;
}


export interface ServerUser extends User {
    jobTitle: string;
    directManager: string;
    description: string;
}

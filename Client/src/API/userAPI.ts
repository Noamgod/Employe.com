import API from "./connection";
import {UpdateUser, User, UserClient} from "../types/user";
import {logIn} from "../pages/LogInPage/LogInPage";


const getUser = async (info: logIn): Promise<User> => {
    return await API(`/login`, 'POST', info) as User;
}


const createUser = async (data: UserClient) => {
    await API('/singUp', 'POST', data);
}

const getAllUsers = async (): Promise<User[]> => {
    return await API('/allUsers', 'GET', null) as User[];
}
const deleteUser = async (email: string) => {
    return await API(`/deleteUser`, 'DELETE', {email: email}) as number;
}
const updateUser = async (data: UpdateUser): Promise<User> => {
    return await API(`/updateUser`, 'PUT', data) as User ;
}
export {getUser, createUser, getAllUsers, deleteUser, updateUser};
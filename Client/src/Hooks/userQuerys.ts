import {useMutation, UseMutationResult, useQuery, UseQueryResult} from "react-query";
import {getAllUsers, getUser, deleteUser, updateUser} from "../API/userAPI";
import {UpdateUser, User} from "../API/type/user";
import {AxiosError} from "axios";
import {logIn} from "../Pages/LogInPage/LogInPage";

const useLogIn = (): UseMutationResult<User, AxiosError, logIn> => {
    return useMutation(['login'], getUser);
}
const useGetAllUsers = (): UseQueryResult<User[], AxiosError> => {
    return useQuery('users', getAllUsers);
}
const useDeleteUser = (): UseMutationResult<number, AxiosError,string> =>{
    return useMutation(['deleteUser'], deleteUser);
}
const useUpdateUser = (): UseMutationResult<User, AxiosError,UpdateUser> =>{
    return  useMutation(['updateUser'], updateUser);
}
export {useLogIn, useGetAllUsers,useDeleteUser,useUpdateUser}
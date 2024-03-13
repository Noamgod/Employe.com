import DBConnection from "../../services/db/dbAccess";
import {CreateUser, ServerUser, UpdateUser} from "../../types/user/user";
import {Request, Response} from "express";
import {jwt, secretKey} from "./const";



const loginEnePoint = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    try {
        const user = await DBConnection.getUser(email, password);
        console.log(secretKey)
        const accessToken = jwt.sign(user, secretKey);
        res.status(200).send({user, Authorization: accessToken});
    } catch (error: any) {
        res.status(error.status == undefined ? 500 : error.status).send(error.message);
    }
};

const singUpEnePoint = async (req: Request, res: Response) => {
    const user: CreateUser = req.body;
    try {
        const result = await DBConnection.createUser({...user, role: 'user'})
        res.status(201).send(user);
    } catch (error: any) {
        console.error("Error:", error.message);
        res.status(error.status == undefined ? 500 : error.status).send(error.message);
    }
};
const getAllUsersEnePoint = async (req: Request, res: Response) => {
    try {
        const hasAccesses = jwt.verify(req.headers.authorization, secretKey);
        if (!hasAccesses || hasAccesses.role !== 'admin') {
            throw {message: "You do not have access to this page", status: 403}
        } else {
            const users: ServerUser[] = await DBConnection.getAllUsers()
            res.status(200).send(users);
        }
    } catch (error: any) {
        console.error("Error:", error.message);
        res.status(error.status == undefined ? 500 : error.status).send(error.message);
    }
}
const updateUserEnePoint = async (req: Request, res: Response) => {
    const user: UpdateUser = req.body;
       try {
        const result = await DBConnection.updateUser(user);
        res.sendStatus(200).send(result);
    } catch (error: any) {
        console.error("Error:", error.message);
        res.status(error.status == undefined ? 500 : error.status).send(error.message);
    }

}
const deleteUserEnePoint = async (req: Request, res: Response) => {
    const {email} = req.body;
    try {
        const hasAccesses = jwt.verify(req.headers.authorization, secretKey);
        if (!hasAccesses || hasAccesses.role !== 'admin') {
            throw {message: "You do not have access to do this", status: 403}
        } else {
            const result = await DBConnection.deleteUser(email);
            res.sendStatus(200).send(result);
        }
    } catch (error: any) {
        console.error("Error:", error.message);
        res.status(error.status == undefined ? 500 : error.status).send(error.message);
    }
}

const deleteAllUsersEnePoint = async (req: Request, res: Response) => {
    try {
        const hasAccesses = jwt.verify(req.headers.authorization, secretKey);
        if (!hasAccesses || hasAccesses.role !== 'admin') {
            throw {message: "You do not have access to do this", status: 403}
        } else {
            const result = await DBConnection.deleteAllUsers();
            res.sendStatus(200).send(result);
        }
    } catch (error: any) {
        console.error("Error:", error.message);
        res.status(error.status == undefined ? 500 : error.status).send(error.message);
    }
}
export {
    loginEnePoint,
    singUpEnePoint,
    getAllUsersEnePoint,
    updateUserEnePoint,
    deleteUserEnePoint,
    deleteAllUsersEnePoint
}
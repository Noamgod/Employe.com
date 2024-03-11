import DBConnection from "../IntiConnections/initMongo";
import {CreateUser, ServerUser, UpdateUser} from "../typs/User";
import {Request, Response} from "express";

const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;


const loginEnePoint = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const userData = {email: email, password: password};
    try {
        let user: ServerUser = await DBConnection.getUser(userData.email, userData.password);
        const accessToken = jwt.sign(user, secretKey, {expiresIn: '30m'});
        res.status(200).send({user, Authorization: accessToken});
    } catch (error: any) {
        console.error("Error:", error.message);
        res.status(error.status == undefined ? 500 : error.status).send(error.message);
    }
};

const singUpEnePoint = async (req: Request, res: Response) => {
    const {email, password, firstName, lastName, phone}: CreateUser = req.body;
    const user: CreateUser = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        role: 'user',
        phone: phone,
    };
    try {
        const result = await DBConnection.createUser(user)
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
    const {
        email,
        password,
        firstName,
        lastName,
        role,
        phone,
        description,
        directManager,
        jobTitle
    }: UpdateUser = req.body;
    const user: UpdateUser = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        role: role,
        phone: phone,
        description: description,
        directManager: directManager,
        jobTitle: jobTitle
    };


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
            throw {message: "You do not have access to this page", status: 403}
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
        const result = await DBConnection.deleteAllUsers();
        res.sendStatus(200).send(result);
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
import {CreateUser, ServerUser, UpdateUser} from "../types/user/user";
import {userLogInSchema, userSingUpSchema, userUpdateSchema} from "../types/user/userSingUpSchema";
import {validateData} from "./validation";

export default class BusinessLogic {
    static async getUser(collection: any, email: string, password: string) {
        const validator = validateData({email, password}, userLogInSchema);
        if (validator)
            throw validator;
        try {
            const result = await collection.findOne({email: email, password: password}, {
                projection: {
                    _id: 0,
                    password: 0
                }
            });
            if (!result) {
                throw {message: "The email or password is not correct", status: 404}
            }
            return result;
        } catch (e: any) {
            throw e
        }
    }

    static async getAllUsers(collection: any): Promise<ServerUser[]> {
        try {
            const result = await collection.find({}, {
                projection: {
                    _id: 0,
                    password: 0
                }
            }).sort({firstName: 1}).toArray()

            return result;

            if (!result) {
                throw {message: "There is no users", status: 404}
            }
        } catch (e) {
            throw e
        }
    }

    static async createUser(collection: any, user: CreateUser) {
        const validator = validateData(user, userSingUpSchema);
        if (validator)
            throw validator;
        const userExists = await collection.findOne({email: user.email});
        if (userExists) {
            throw {message: "User already exists", status: 403}
        } else {
            const result = await collection.insertOne({
                email: user.email,
                password: user.password,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone
            });
            return result;
        }
    }

    static async updateUser(collection: any, user: UpdateUser) {
        const validator = validateData(user, userUpdateSchema);
        if (validator)
            throw validator;
        const fieldsToUpdate = ['email', 'password', 'role', 'firstName', 'lastName', 'phone', 'jobTitle', 'directManager', 'description'];
        const updateFields = Object.fromEntries(
            Object.entries(user)
                .filter(([key, value]) => fieldsToUpdate.includes(key) && value !== undefined)
                .map(([key, value]) => [key, value])
        );

        const {acknowledged, modifiedCount} = await collection.updateOne({email: user.email}, {
            $set: updateFields
        });
        if (!acknowledged) {
            throw {message: "You pass the same user", status: 403}
        }
        return modifiedCount;
    }

    static async deleteUser(collection: any, email: string) {
        const userExists = await collection.findOne({
            email: email,
        });
        if (!userExists) {
            throw {message: "User does not exist", status: 404};
        } else {
            const {acknowledged, deletedCount} = await collection
                .deleteOne({
                    email: email,
                });
            if (!acknowledged) {
                throw {message: "There was a problem , the number of delete "}
            }
            return deletedCount

        }
    }

    static async deleteAllUsers(collection: any) {
        const {acknowledged, deletedCount} = await collection.deleteMany({});
        if (!acknowledged) {
            throw {message: "There was a problem , the number of delete "}
        }
        return deletedCount
    }

}
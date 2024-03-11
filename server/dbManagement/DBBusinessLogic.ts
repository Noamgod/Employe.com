import {CreateUser, ServerUser, UpdateUser, User} from "../typs/User";
import {userLogInSchema, userSchema} from "../typs/UserSchema";
import {ErrorResponse} from "../typs/Error";

export default class DBBusinessLogic {
    static async getUser(collection: any, email: string, password: string) {
        if (userLogInSchema.validate({email: email, password: password}).error) {
            const error: ErrorResponse = {
                message: userLogInSchema.validate({email: email, password: password}).error.message,
                status: 400
            }
            throw error
        }
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
            }).sort({firstName: 1}).toArray();
            return result
            if (!result) {
                throw {message: "There is no users", status: 404}
            }
        } catch (e) {
            throw e
        }
    }

    static async createUser(collection: any, user: CreateUser) {
        if (userSchema.validate(user).error) {
            throw {message: userSchema.validate(user).error.message, status: 400}
        }
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
        if (userSchema.validate(user).error) {
            throw {message: userSchema.validate(user).error.message, status: 400}
        }
        const {acknowledged, modifiedCount} = await collection.updateOne({email: user.email}, {
            $set: {
                email: user.email,
                password: user.password,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone
            }
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
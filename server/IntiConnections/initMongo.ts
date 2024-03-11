import {CreateUser, ServerUser, UpdateUser} from "../typs/User";
import {MongoClient} from "mongodb";
import DBBusinessLogic from "../dbManagement/DBBusinessLogic";

require('dotenv').config();
const {ServerApiVersion} = require('mongodb');

const uri = process.env.MONGODB_URI || '';

export default class DBConnection {
    static client: MongoClient;

    static async connect() {
        this.client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        await this.client.connect().catch((err) => {
        });

    }

    static async disconnect() {
        await this.client.close();
    }

    static async getUser(email: string, password: string) {
        const db = this.client.db('Julius');
        const collection = db.collection('employee');
        let result;
        try {
            result = await DBBusinessLogic.getUser(collection, email, password);
        } catch (e) {
            throw e
        }
        return result;
    }

    static async getAllUsers(): Promise<ServerUser[]> {
        const db = this.client.db('Julius');
        const collection = db.collection('employee');
        let result;
        try {
            result = await DBBusinessLogic.getAllUsers(collection);
            return result;
        } catch (e) {
            throw e
        }

    }

    static async createUser(user: CreateUser) {
        const db = this.client.db('Julius');
        const collection = db.collection('employee');
        let result;
        try {
            result = await DBBusinessLogic.createUser(collection, user);
        } catch (e) {
            throw e
        }
        return result;
    }

    static async updateUser(user: UpdateUser) {
        const db = this.client.db('Julius');
        const collection = db.collection('employee');
        let result;
        try {
            result = await DBBusinessLogic.updateUser(collection, user);
        } catch (e) {
            throw e
        }
        return result;
    }

    static async deleteUser(email: string) {
        const db = this.client.db('Julius');
        const collection = db.collection('employee');
        let result;
        try {
            result = await DBBusinessLogic.deleteUser(collection, email);
        } catch (e) {
            throw e
        }
        return result;
    }

    static async getCollection() {
        const db = this.client.db('Julius');
        const collection = db.collection('employee');
        return collection;
    }

    static async deleteAllUsers() {
        const db = this.client.db('Julius');
        const collection = db.collection('employee');
        let result;
        try {
            result = await DBBusinessLogic.deleteAllUsers(collection);
        } catch (e) {
            throw e
        }
        return result;
    }


}



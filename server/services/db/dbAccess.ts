import {CreateUser, ServerUser, UpdateUser} from "../../types/user/user";
import BusinessLogic from "../../controller/businessLogic";
import {Collection, MongoClient, ServerApiVersion} from 'mongodb';


export default class DBConnection {
    private static client: MongoClient;
    private static collection: Collection;

    static async connect(uri: string, dbName: string, collectionName: string): Promise<void> {
        this.client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        await this.client.connect();
        // const ping = await this.client.db(dbName).command({ping: 1});
        // console.log(ping);
        this.collection = await this.getCollection(dbName, collectionName);
    }

    private static async getCollection(dbName: string, collection: string): Promise<Collection> {
        if (!this.client) {
            throw new Error('MongoDB client not initialized');
        }
        return this.client.db(dbName).collection(collection);
    }

    static async getUser(email: string, password: string): Promise<ServerUser | null> {
        try {
            return await BusinessLogic.getUser(this.collection, email, password);
        } catch (e) {
            throw e;
        }
    }

    static async getAllUsers(): Promise<ServerUser[]> {
        try {
            return await BusinessLogic.getAllUsers(this.collection);
        } catch (e) {
            throw e;
        }
    }

    static async createUser(user: CreateUser): Promise<any> {
        try {
            return await BusinessLogic.createUser(this.collection, user);
        } catch (e) {
            throw e;
        }
    }

    static async updateUser(user: UpdateUser): Promise<any> {
        try {
            return await BusinessLogic.updateUser(this.collection, user);
        } catch (e) {
            throw e;
        }
    }

    static async deleteUser(email: string): Promise<any> {
        try {
            return await BusinessLogic.deleteUser(this.collection, email);
        } catch (e) {
            throw e;
        }
    }

    static async deleteAllUsers(): Promise<any> {
        try {
            return await BusinessLogic.deleteAllUsers(this.collection);
        } catch (e) {
            throw e;
        }
    }
}




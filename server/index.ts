import DBConnection from "./services/db/dbAccess";
import Server from "./services/initServer";
require('dotenv').config();

const uri = process.env.MONGODB_URI || '';

const connecting = async () => DBConnection.connect(uri,'Julius', 'employee')
connecting().then(() => {
    console.log("Connected to DB")
}).catch((err) => {
    console.log(err);
});
const app = Server.initServer()

Server.runServer(app, 3000).then(() => {
        console.log("Server is running on port 3000")
}
).catch((err) => {
    console.log(err);
});

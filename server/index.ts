import DBConnection from "./IntiConnections/initMongo";
import Server from "./IntiConnections/initServer";

const connecting = async () => DBConnection.connect()
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

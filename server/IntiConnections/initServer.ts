import userRouter from "../routers/userRouter";

export default class Server {
    static initServer(): any {
        const express = require('express');
        const app = express();
        const cors = require('cors');
        const userBody = require('body-parser');
        app.use(cors());
        app.use(userBody.json());
        app.use('/user', userRouter);
        return app;
    }

    static async runServer(app: any, port: number) {
        app.listen(port, () => {
            console.log(`App listening at http://localhost:${port}`);
        });
    }

}
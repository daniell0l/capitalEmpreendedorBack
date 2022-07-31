import  express from 'express';

import * as swaggerUI from "swagger-ui-express"
import router from './routes';

const app = express();

app.use(express.json());
app.use("/api", swaggerUI.serve, swaggerUI.setup())

app.get("/capital", (req, res) => {
    return res.json({
        message: "ok capital",
    });
});


app.use("/v1", router);
//app.listen(3333, () => console.log("Server is running"))

export default app
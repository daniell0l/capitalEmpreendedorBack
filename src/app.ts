import express from "express";
import cors from "cors"
import * as swaggerUI from "swagger-ui-express";
import router from "./routes";
import morgan from "morgan";

import swaggerFile from "./swagger.json";

const app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.get("/capital", (req, res) => {
  return res.json({
    message:
      "teste realizado para as rotas de manipulação da capital empreendedor",
  });
});
 
app.use("/users", router);

export default app;

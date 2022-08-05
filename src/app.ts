import express from "express";

import * as swaggerUI from "swagger-ui-express";
import router from "./routes";


import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.get("/TermsCapital", (req, res) => {
  return res.json({
    message:
      "teste realizado para as rotas de manipulação da capital empreendedor",
  });
});

app.use("/v1", router);

export default app;
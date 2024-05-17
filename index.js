import "dotenv/config";
import "./utils/connect.js";
import express from "express";
import cookieParser from "cookie-parser";
const app = express();
import cors from "cors";

//IMPORTACIONES DE RUTAS
import userRouter from "./routes/auth.routes.js";
import linkRoutes from "./routes/link.routes.js";
import redirectRouter from "./routes/redirec.routes.js";

// MIDDLEWARES;
const whiteList = [process.env.ORIGIN1];

app.use(
  cors({
    origin: function (origin, callback) {
      if (whiteList.includes(origin)) {
        return callback(null, origin);
      }

      return callback("Error de CORS " + origin + "No autorizado");
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//RUTAS
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/links", linkRoutes);
app.use("/", redirectRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT} 😃`);
});

import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Base de datos conectado ✅");
} catch (error) {
  console.log(`error de conexion a mongo db ${error}`);
}

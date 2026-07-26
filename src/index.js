import app from "./app.js";
import dotenv from "dotenv";
import startDB from "./database/db.js";

dotenv.config();

startDB();

const PORT = 3939;

app.listen(PORT, () => {
    console.log(`Servidor conectado rodando na porta: ${PORT}.`)
});
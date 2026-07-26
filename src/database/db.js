import mongoose, { mongo } from "mongoose";

async function startDB(){
    await mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Banco conectado"))
    .catch((error) => console.log(error));
}

export default startDB;
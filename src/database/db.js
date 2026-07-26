import mongoose, { mongo } from "mongoose";

async function startDB(){
    await mongoose.connect(``)
    .then(() => console.log("Banco conectado"))
    .catch((error) => console.log(error));
}

export default startDB;
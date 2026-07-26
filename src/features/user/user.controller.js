import app from "../../app.js";
import UserModel from "./user.model.js";
import safeUser from "../../utils/safeUser.js";

class UserController{
    async create(req, res){
        try{
            const user = await UserModel.create(req.body);
            const userSafe = safeUser(user);

            res.status(201).json({
                message: "Usuário criado", 
                user: userSafe
            });
        }
        catch(error){
            console.log(error);
            res.status(500).json({message: "Internal Error"});            
        }
    }
    async read(req, res){
        try{
            const id = req.params.id;

            const user = await UserModel.findById(id);
            const userSafe = safeUser(user);

            res.status(200).json({
                message: "Usuário lido com sucesso",
                user: userSafe
            });

        }
        catch(error){
            console.log(error);
            res.status(500).json({message: "Internal Error"});            
        }
    }
    async update(req, res){
        try{
            const id = req.params.id;

            const user = await UserModel.findByIdAndUpdate(id, req.body, { returnDocument: "after"});
            const userSafe = safeUser(user);

            res.status(200).json({
                message: "Usuário atualizado com sucesso",
                user: userSafe
            });
            
        }
        catch(error){
            console.log(error);
            res.status(500).json({message: "Internal Error"});            
        }
    }
    async delete(req, res){
        try{
            const id = req.params.id;

            const user = await UserModel.findByIdAndDelete(id);

            if(!user){
              return res.status(404).json({message: "Este usuário não existe!"})
            }

            return res.status(200).json({
                message: "Usuário excluído com sucesso",
            });
            
        }
        catch(error){
            console.log(error);
            res.status(500).json({message: "Internal Error"});            
        }
    }
}

export default new UserController();
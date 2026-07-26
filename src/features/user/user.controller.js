import app from "../../app.js";
import UserModel from "./user.model.js";
import safeUser from "../../utils/safeUser.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class UserController{
    async create(req, res){
        try{
            const { password } = req.body;

            const hash = await bcrypt.hash(password, 10);

            const user = await UserModel.create({
                ...req.body,
                password : hash
            });
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

    async login(req, res){
        try{
            const { email, password } = req.body;

            const user = await UserModel.findOne({ email });

            if(!user)
                return res.status(404).json({ 
                    message: "User not found"
                });

            const senhaCorreta = await bcrypt.compare(
                password,
                user.password
            );


            if(!senhaCorreta)
                return res.status(401).json({
                  message: "Senha incorreta"
            });

            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn:"30min"
                }
            );

            res.status(200).json({
                messaeg: "Successfully logged in",
                token
            });
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                message: "internal error"
            });
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
import searchModel from "./search.model.js";
import app from "../../app.js";
import jwt from "jsonwebtoken";
import authMiddleware from "../../middleware/auth.middleware.js";

class searchController{
    async create(req, res){
        try{
            const { title, author } = req.params;

            const bookExist = await searchModel.findOne({
                title,
                author,
                user: req.user.id
            });

            if(bookExist)
                return res.status(409).json({
                    message:"Book already exist "
                });

            const search = await searchModel.create({
                ...req.body,
                user: req.user.id
            });

            res.status(201).json({
                message: "Created book",
                search
            });

        }
        catch(error){
            console.log(error);
            res.status(500).json({message: "Internal Error"});            
        }
    }
    async readAll(req, res){
        try{
            const search = await searchModel.find({ 
                id:_id,
                user: req.user.id
            });

            res.status(201).json({
                message: "Book finded",
                search: search
            });
        }
        catch(error){
            console.log(error);
            res.status(500).json({message: "Internal Error"});            
        }
    }
    async readOne(req, res){
        try{
            const id = req.params.id;

            const search = await searchModel.findOne({
                _id: id,
                user: req.user.id
            });
            if(!search)
                return res.status(404).json({
                    message:"Book not found"
                });
        }
        catch(error){
            console.log(error);
            res.status(500).json({message: "Internal Error"});            
        }
    }
    async update(req,res){
        const id = req.params.id;

        const search = await searchModel.findByIdAndUpdate(id, req.body, { returnDocument: "after" });

        res.status(200).json({
            message: "Book successfully updated"
        });
    }
    async delete(req, res){
        try{
            const id = req.params.id;

            const search = await searchModel.findByIdAndDelete(id);

            if(!search)
                return res.status(404).json({
                    message:"Book not found"
                });

            return res.status(200).json({
                message:"Book successfully deleted"
            });
        }
        catch(error){
            console.log(error);
            res.status(500).json({message: "Internal Error"});            
        }
    }
}

export default new searchController();
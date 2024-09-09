const UserService = require( "../services/User.Services.js");


class User {
    async getUser(req,res) {
        const {id} = req.params;
        const user = await UserService.getUserById(id);
    
        return res.status(200).json(user);
    }

    async allUsers(req,res) {
        const {page,limit}= req.query
        const users = await UserService.getAllUsers(page??0,limit??20);
        return res.status(200).json(users);
    }

    async createUser(req,res) {
        const user = await UserService.createUser(req.body);
        return res.status(200).json(user);
    }

    async destroyUser(req,res){
        const {id} = req.params;
        const user = await UserService.deleteUser(id);
        return res.status(200).json(user);
    }
    
}

module.exports = new User;
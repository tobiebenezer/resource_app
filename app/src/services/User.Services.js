const db = require('../models');
const userModel = db.getModels().User;


class UserService {
    constructor(User){
        this.User = User;
    }

    async createUser (user) {
        try {
            const newUser = await this.User.create(user);
            return newUser;
        } catch (error) {
            
            throw error;
        }
    }

    async getUserById(id){
        try {
            const user = await this.User.findByPk(id);
            return user;
        } catch (error) {
            
            throw error;
        }
    }


    async getAllUsers(page=0, limit = 20){
        try {
    
            const {data ,pagination}= await this.User.paginate({
                page,
                limit
            });
            
            return {
                pagination,
                data
            }
        } catch (error) {
            
            throw error;
        }
    }

    async updeateUser(id,user){
        try {
            const updatedUser = await this.User.update(user,{where:{id}});
            return updatedUser;
        } catch (error) {
            
            throw error;
        }
    }

    async deleteUser(id){
        try{
            const deletedUser = await this.User.destroy({where:{id}});
            return deletedUser;
        }catch(error){
            
            throw error;
        }
    }
}

module.exports = new UserService(userModel);
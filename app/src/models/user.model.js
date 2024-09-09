const { DataTypes, Model } = require("sequelize");
const paginate  = require("../helpers/model_extensions/pagination");


module.exports = (sequelize)=>{
    class User extends Model {
        static paginate(options) {
            return paginate(this, options);
        }
    }

    User.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        dob:{
            type: DataTypes.DATE,
            allowNull: false
        }
        },{
            sequelize,
            modelName: 'User'
        });

    return {name: "User",model: User};

} 


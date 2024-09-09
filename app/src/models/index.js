const fs = require("fs");
const path = require("path");
const sequelize = require("../database/sqlite.db");

const basename = path.basename(__filename);

class Database {
    constructor(){
        this.sequelize = sequelize;
        this.models = {};
    }

    async connect(params) {
        try{
            await this.sequelize.authenticate();
            console.log("Connected to the database");
        }catch(error){
            console.error("Unable to connect to the database",error);
        }
    }

    setupModels(){
        fs
        .readdirSync(__dirname)
        .filter(file => {
          return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js') && (!file.includes( 'associations.js'));
        })
        .forEach(file => {
          const model = require(path.join(__dirname, file))(this.sequelize).model;
          this.models[model.name] = model;
        });

        // //Relation
        // fs.readdirSync(__dirname)
        // .filter(file=>{
        //     return (file.indexOf('.') !== 0)&& (file !== basename) && (!file.includes( 'associations.js'))
        // }).forEach(file => {
        //     require(path.join(__dirname, file))(this.sequelize);
        // });

        Object.values(this.models).forEach(model => {
            if (model.associate) {
              model.associate(this.models);
            }
          });
    }

    getModels(){
        this.setupModels();
        return this.models;
    }

    async sync(){
        await this.sequelize.sync();
        console.log("Database synced");
    }
}

module.exports = new Database;
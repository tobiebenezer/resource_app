const { sequelize } = require(".");

module.exports = (sequelize)=>{
    const {models} = sequelize;

    models.Assessment.hasOne(Doc, {
        foreignKey: 'documentableId',
       constraints: false,
       scope:{
        documentableType: 'Assessment',
       },
    });

}
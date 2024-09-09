const {DataTypes, Model} = require('sequelize');
const paginate  = require("../helpers/model_extensions/pagination");

module.exports = (sequelize)=>{

    class Assessment extends Model {
        static associate(models) {
            Assessment.hasMany(models.Document, {
              foreignKey: 'documentableId',
              constraints: false,
              scope: {
                documentableType: 'Assessment',
              },
              as: 'Documents'
            });
          }

        static paginate(options) {
            return paginate(this, options);
        }
    }

    Assessment.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        courseCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        size: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    },{
        sequelize,
        modelName: 'Assessment',
        tableName: 'Assessments',
    });
    
    // //Relationship
    // Assessment.hasOne(Doc,{
    //     foreignKey: 'documentableId',
    //     constraints: false,
    //     scope: {
    //         documentableType: 'Assessment'
    //     }
    // })

    return {name:'Assessment' , model: Assessment};
};

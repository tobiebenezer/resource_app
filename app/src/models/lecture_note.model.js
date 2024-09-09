const {DataTypes, Model} = require('sequelize');
const paginate  = require("../helpers/model_extensions/pagination");

module.exports = (sequelize)=>{

    class Lecture_note extends Model {
        static associate(models) {
            Lecture_note.hasMany(models.Document, {
              foreignKey: 'documentableId',
              constraints: false,
              scope: {
                documentableType: 'Lecture_note',
              },
              as: 'Documents'
            });
          }

        static paginate(options) {
            return paginate(this, options);
        }
    }

    Lecture_note.init({
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
        modelName: 'Lecture_note',
        tableName: 'Lecture_notes',
    });
    
    // //Relationship
    // Lecture_note.hasOne(Doc,{
    //     foreignKey: 'documentableId',
    //     constraints: false,
    //     scope: {
    //         documentableType: 'Lecture_note'
    //     }
    // })

    return {name:'Lecture_note' , model: Lecture_note};
};

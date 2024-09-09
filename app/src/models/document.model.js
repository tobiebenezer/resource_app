const {DataTypes, Model} = require('sequelize');


module.exports = (sequelize)=>{
    class Document extends Model {
        getDocumentable(options){
            if(!this.documentableType) return Promise.reject(null);

            const mixinMethodName = `get${uppercaseFirst(this.documentableType)}`;
            return this[mixinMethodName](options);
        }

        static associate(models) {
            models.Document.belongsTo(models.Lecture_note, {
              foreignKey: 'documentableId',
              constraints: false,
              as: 'Lecture_note'
            });

            models.Document.belongsTo(models.Assessment, {
                foreignKey: 'documentableId',
                constraints: false,
                as: 'Assessment'
            });
        }
        
    }

    Document.init({
        documentableType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        documentableId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        sequelize,
        modelName: 'Document',
        tableName: 'Documents',
    });

    return{name: 'Document', model: Document};
};

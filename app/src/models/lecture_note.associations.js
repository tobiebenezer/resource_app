
module.exports = (sequelize) => {
    const {models} = sequelize

    models.Lecture_note.hasOne(models.Document, {
        foreignKey: 'documentableId',
       constraints: false,
       scope:{
        documentableType: 'Lecture_note',
       },
    });
}

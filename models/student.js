export default (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        suspend: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }
      },
      {
        indexes:[
          {unique:true, fields: ['email']}
        ],
        freezeTableName: true,
        tableName: 'student'
      });
  Student.associate = function(models) {
    models.Student.belongsToMany(models.Teacher, {through:'TeacherStudent'});
  };
  return Student;
};
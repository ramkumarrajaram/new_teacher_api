export default (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    indexes:[
      {unique:true, fields: ['email']}
    ],
    freezeTableName: true,
    tableName: 'teacher'
  });
  Teacher.associate = function(models) {
    models.Teacher.belongsToMany(models.Student, {through:'TeacherStudent'});
  };
  return Teacher;
};
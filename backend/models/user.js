module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    email: {
      type: Sequelize.STRING(40),
      required: true,
      unique: true,
    },
    username: {
      type: Sequelize.STRING(40),
      required: true,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(40),
      required: true,
    },
    image_url: {
      type: Sequelize.STRING,
    } 
  }, {
    underscored: true
  })
  User.associate = (models) => {
    User.hasMany(models.Post, { foreignKey: 'userId'}, { onDelete: 'cascade'})
  }
  return User;
};

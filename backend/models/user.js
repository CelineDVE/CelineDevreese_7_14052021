module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    email: {
      type: Sequelize.STRING,
      required: true,
      unique: true,
    },
    username: {
      type: Sequelize.STRING,
      required: true,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      required: true,
    },
    imageUrl: {
      type: Sequelize.STRING,
    }
  });
  return User;
};

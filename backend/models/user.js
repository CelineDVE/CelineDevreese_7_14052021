module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: Datatypes.STRING(40),
        allowNull: false,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      username: {
        type: Datatypes.STRING(40),
        allowNull: false,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 40,
        trim: true,
      },
      password: {
        type: Datatypes.STRING,
        allowNull: false,
        required: true,
        minLength: 6,
      },
      image_url: {
        type: Datatypes.STRING,
        default: "./profil_default.jpeg",
      },
      message: {
        type: Datatypes.STRING,
        required: false,
      },
      followers: {
        type: Datatypes.JSON,
      },
      following: {
        type: Datatypes.JSON,
      },
      likes: {
        type: Datatypes.JSON,
      },
    },
    {
      underscored: true,
    }
  );
  User.associate = (models) => {
    User.hasMany(
      models.Post,
      { foreignKey: "userId" },
      { onDelete: "cascade" }
    );
  };
  return User;
};

"use strict";

module.exports = (sequelize, Datatypes) => {
  const Post = sequelize.define(
    "Post",
    {
      userId: {
        type: Datatypes.INTEGER,
        require: true,
      },
      username: {
        type: Datatypes.STRING(40),
        allowNull: false,
        required: true,
        minLength: 3,
        maxLength: 40,
        trim: true,
      },
      title: {
        type: Datatypes.STRING(100),
        require: true,
      },
      message: {
        type: Datatypes.STRING,
        require: true,
      },
      image_url: {
        type: Datatypes.STRING,
        require: false,
      },
    },
    {
      underscored: true,
    }
  );
  Post.associate = (models) => {
    Post.belongTo(models.User, { foreignKey: { allowNull: false } });

    Post.hasMany(models.Comment, { foreignKey: "postId"}, { onDelete: "casade" });
  };
  return Post;
};

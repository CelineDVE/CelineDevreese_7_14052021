"use strict";

module.exports = (sequelize, Datatypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      message: {
        type: Datatypes.STRING,
        require: true,
      },
      image_url: {
        type: Datatypes.STRING,
        require: false,
      },
      userId: {
        type: Datatypes.INTEGER,
        require: true,
        reference: {
            model: "User",
            key: "id"
        }
      },
      postId: {
        type: Datatypes.INTEGER,
        require: true,
        reference: {
            model: "Post",
            key: "id"
        }
      },
    },
    {
      underscored: true,
    }
  );
  Comment.associate = (models) => {
    Comment.belongTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    Comment.belongTo(models.Post, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Comment;
};

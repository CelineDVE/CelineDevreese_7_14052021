const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {}

  Comment.init(
    {
      message: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};

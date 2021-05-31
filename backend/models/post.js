const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {}

  Post.init(
    {
      message: {
        type: DataTypes.TEXT,
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};

module.exports = (sequelize, Datatypes) => {
  const Post = sequelize.define("Post", {
    userId: {
      type: Datatypes.INTEGER,
      require: true,
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
    likers: {
        type: Datatypes.JSON
    }
  });
  Post.associate = (models) => {
    Post.belongTo(models.User, { foreignKey: { allowNull: false } });

    Post.hasMany(models.Comment, { onDelete: "CASCADE" });
  };
  return Post;
};
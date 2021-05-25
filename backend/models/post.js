module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("Post", {
        title: {
            type: Sequelize.STRING(100),
            require: true 
        },
        message: {
            type: Sequelize.STRING,
            require: true
        },
        image_url: {
            type: Sequelize.STRING,
            require: false
        },
        userId : {
            type: Sequelize.INTEGER,
            required: true
        }
    })
      Post.associate = (models) => {
        Post.belongTo(
          models.User,
          { foreignKey: 
          { allowNull: false}
          });
      };
    return Post;
}
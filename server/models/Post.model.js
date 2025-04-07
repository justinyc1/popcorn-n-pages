import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class Post extends Model {}

    Post.init(
    {
        // Columns:
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE', // Optional: Delete all posts by the user when the user is deleted  
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,    // a post must have a title
            validate: 
            {
                len: [3, 250],
                notEmpty: true,
            },
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,    // a post must have some content aside from title
            validate: 
            {
                len: [3, 250],
                notEmpty: true,
            },
        },
    },
    {
        sequelize,
        modelName: "Post",
        tableName: 'posts',
        timestamps: true,   // Automatically manage createdAt and updatedAt columns (default true)
    }
    );

    // Define associations
    Post.associate = (models) => {
        Post.belongsTo(models.User, { foreignKey: 'userId' }); // A post belongs to a user (FK)
        Post.hasMany(models.PostComment, { foreignKey: 'postId' }); // A post has many comments (one-to-many)
    };

    return Post;
};
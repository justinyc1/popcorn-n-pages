import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class PostComment extends Model {}

    PostComment.init(
    {
        // Columns:
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE', // Optional: Delete all post comments by the user when the user is deleted  
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE', // Optional: Delete all post comments when the post is deleted  
        },
        comment: {
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
        modelName: "PostComment",
        tableName: 'post_comments',
        timestamps: true,   // Automatically manage createdAt and updatedAt columns (default true)
    }
    );

    // Define associations
    PostComment.associate = (models) => {
        PostComment.belongsTo(models.User, { foreignKey: 'userId' }); // A post comment belongs to a user (FK)
        PostComment.belongsTo(models.Post, { foreignKey: 'postId' }); // A post comment belongs to a post (FK)
    };

    return PostComment;
};
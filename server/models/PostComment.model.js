import { Model } from "sequelize";
// import { Model, DataTypes } from 'sequelize';
// import sequelize from './sequelize';  // Your Sequelize instance

export default (sequelize, DataTypes) => {
    class PostComment extends Model {}

    PostComment.init(
    {
        id: {
            type: DataTypes.INTEGER, // Column type: INTEGER
            primaryKey: true,        // Make this the primary key
            autoIncrement: true,     // Auto-increment the id
        },
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
        createdAt: {
            type: DataTypes.DATE,    // Column type: DATE
            defaultValue: DataTypes.NOW, // Default value: current timestamp
        },
        updatedAt: {
            type: DataTypes.DATE,    // Column type: DATE
            defaultValue: DataTypes.NOW, // Default value: current timestamp
        }
    },
    {
        sequelize,
        modelName: "PostComment",
        tableName: 'post_comments',
        timestamps: true,   // Automatically manage createdAt and updatedAt columns (default true)
    }
    );

    // Define associations (relationships) here
    PostComment.associate = (models) => {
        // associations can be defined here
        PostComment.belongsTo(models.User, { foreignKey: 'userId' }); // A post comment belongs to a user (FK)
        PostComment.belongsTo(models.Post, { foreignKey: 'postId' }); // A post comment belongs to a post (FK)
    };

    return PostComment;
};
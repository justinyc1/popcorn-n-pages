import { Model } from "sequelize";
// import { Model, DataTypes } from 'sequelize';
// import sequelize from './sequelize';  // Your Sequelize instance

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
        references: {        // FK
            model: User,     // References the 'User' model
            key: 'id',       // The 'id' column in the 'User' model
        },
        onDelete: 'CASCADE', // Optional: Delete all post comments by the user when the user is deleted  
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {        // FK
            model: Post,     // References the 'Post' model
            key: 'id',       // The 'id' column in the 'Post' model
        },
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
    modelName: "PostComments",
    tableName: 'post_comments',
    timestamps: true,   // Automatically manage createdAt and updatedAt columns (default true)
}
);

// Define associations (relationships) here
PostComment.belongsTo(User, { foreignKey: 'userId' }); // A post comment belongs to a user (FK)
PostComment.belongsTo(Post, { foreignKey: 'postId' }); // A post comment belongs to a post (FK)

sequelize.sync()
  .then(() => {
    console.log("PostComment table has been created (if it didn't exist already).");
  })
  .catch(err => {
    console.error("Error syncing the database:", err);
  });

export default Post;
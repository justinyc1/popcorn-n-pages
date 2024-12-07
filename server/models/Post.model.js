import { Model } from "sequelize";
// import { Model, DataTypes } from 'sequelize';
// import sequelize from './sequelize';  // Your Sequelize instance

class Post extends Model {}

Post.init(
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
    modelName: "Post",
    tableName: 'posts',
    timestamps: true,   // Automatically manage createdAt and updatedAt columns (default true)
}
);

// Define associations (relationships) here
Post.belongsTo(User, { foreignKey: 'userId' }); // A post belongs to a user (FK)
Post.hasMany(PostComment, { foreignKey: 'postId' }); // A post has many comments (one-to-many)

sequelize.sync()
  .then(() => {
    console.log("Post table has been created (if it didn't exist already).");
  })
  .catch(err => {
    console.error("Error syncing the database:", err);
  });

export default Post;
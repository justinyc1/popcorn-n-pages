import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize';  // Your Sequelize instance

class Review extends Model { }

Review.init(
{
    // Columns (or attributes) defined here:
    id: {
        type: DataTypes.INTEGER, // Column type: INTEGER
        primaryKey: true,        // Make this the primary key
        autoIncrement: true,     // Auto-increment the id
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {            // FK
            model: User,    // References the 'User' model
            key: 'id',           // The 'id' column in the 'User' model
        },
    },
    mediaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {            // FK
            model: Media,    // References the 'Media' model
            key: 'id',           // The 'id' column in the 'Media' model
        },
    },
    rating: {
        type: DataTypes.INTEGER, // Rating is an integer
        allowNull: false,        // Rating cannot be NULL
        validate:                // Ensure rating is in range [1,10]
        {
            min: 1,  // Minimum value (inclusive)
            max: 10, // Maximum value (inclusive)
        },
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
    sequelize,            // The Sequelize instance that connects to the database
    modelName: 'Review',  // The name of the model (which maps to the 'reviews' table by default)
    tableName: 'reviews', // Custom table name (optional, default is pluralized model name)
    timestamps: true,     // Automatically manage createdAt and updatedAt columns (default true)
}
);

// Define associations (relationships) here
Review.belongsTo(User, { foreignKey: 'userId' }); // A post belongs to a user (FK)
Review.belongsTo(Media, { foreignKey: 'mediaId' }); // A review belongs to a media (FK)

// Sync the model with the database (create the table if it doesn't exist)
sequelize.sync()
    .then(() => {
        console.log("Review table has been created (if it didn't exist already).");
    })
    .catch(err => {
        console.error("Error syncing the database:", err);
    });

export default Review;

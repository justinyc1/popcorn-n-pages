import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class Review extends Model { }

    Review.init(
    {
        // Columns:
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        mediaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
            allowNull: false,    // a review must have a title
            validate: 
            {
                len: [3, 250],
                notEmpty: true,
            },
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,    // a review must have some content aside from title
            validate: 
            {
                len: [3, 250],
                notEmpty: true,
            },
        },
    },
    {
        sequelize,            // The Sequelize instance that connects to the database
        modelName: 'Review',  // The name of the model (which maps to the 'reviews' table by default)
        tableName: 'reviews', // Custom table name (optional, default is pluralized model name)
        timestamps: true,     // Automatically manage createdAt and updatedAt columns (default true)
    }
    );

    // Define associations
    Review.associate = (models) => {
        Review.belongsTo(models.User, { foreignKey: 'userId' }); // A post belongs to a user (FK)
        Review.belongsTo(models.Media, { foreignKey: 'mediaId' }); // A review belongs to a media (FK)
    };

    return Review;
};
    
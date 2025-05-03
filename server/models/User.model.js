import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class User extends Model {}

    User.init(
    {
        // Columns:
        username: {
            type: DataTypes.STRING,  // Column type: STRING (VARCHAR)
            allowNull: false,        // Username cannot be NULL
            unique: true,            // The username must be unique
        },
        displayName: {
            type: DataTypes.STRING,  // Column type: STRING (VARCHAR)
            allowNull: false,        // Display name cannot be NULL
        },
        passwordHash: {
            type: DataTypes.STRING,  // Column type: STRING (for storing hashed passwords)
            allowNull: false,        // Password cannot be NULL
        },
    },
    {
        sequelize,          // The Sequelize instance that connects to the database
        modelName: 'User',  // The name of the model (which maps to the 'users' table by default)
        tableName: 'users', // Custom table name (optional, default is pluralized model name)
        timestamps: true,   // Automatically manage createdAt and updatedAt columns (default true)
    }
    );

    // Define associations
    User.associate = (models) => {
        User.hasMany(models.Post, { foreignKey: 'userId' });    // A user has many posts (one-to-many)
        User.hasMany(models.PostComment, { foreignKey: 'userId' }); // A user has many comments (one-to-many)
        User.hasMany(models.Review, { foreignKey: 'userId' }); // A user has many reviews (one-to-many)
        User.hasMany(models.UserList, { foreignKey: 'userId' }); // A user has many user created lists (one-to-many)
    };

    return User;
};

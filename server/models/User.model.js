import { Model } from "sequelize";
// import { Model, DataTypes } from 'sequelize';
// import sequelize from './sequelize';  // Your Sequelize instance

export default (sequelize, DataTypes) => {
    class User extends Model { }

    User.init(
    {
        // Columns (or attributes) defined here:
        id: {
            type: DataTypes.INTEGER, // Column type: INTEGER
            primaryKey: true,        // Make this the primary key
            autoIncrement: true,     // Auto-increment the id
        },
        username: {
            type: DataTypes.STRING,  // Column type: STRING (VARCHAR)
            allowNull: false,        // Username cannot be NULL
            unique: true,            // The username must be unique
        },
        displayName: {
            type: DataTypes.STRING,  // Column type: STRING (VARCHAR)
            allowNull: false,        // Display name cannot be NULL
        },
        email: {
            type: DataTypes.STRING,  // Column type: STRING (VARCHAR)
            allowNull: false,        // Email cannot be NULL
            unique: true,            // The email must be unique
        },
        passwordHash: {
            type: DataTypes.STRING,  // Column type: STRING (for storing hashed passwords)
            allowNull: false,        // Password cannot be NULL
        },
        profilePicture: {
            type: DataTypes.BLOB('medium'), // Column type: MEDIUMBLOB
            allowNull: true,         // Users can have default pfp
        },
        settings: {
            type: DataTypes.JSON, // Column type: JSON
            allowNull: true,         // Users can have default settings
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
        sequelize,          // The Sequelize instance that connects to the database
        modelName: 'User',  // The name of the model (which maps to the 'users' table by default)
        tableName: 'users', // Custom table name (optional, default is pluralized model name)
        timestamps: true,   // Automatically manage createdAt and updatedAt columns (default true)
    }
    );

    // Define associations (relationships) here
    User.associate = (models) => {
        // associations can be defined here
        User.hasMany(models.Post, { foreignKey: 'userId' });    // A user has many posts (one-to-many)
        User.hasMany(models.PostComment, { foreignKey: 'userId' }); // A user has many comments (one-to-many)
        User.hasMany(models.Review, { foreignKey: 'userId' }); // A user has many reviews (one-to-many)
        User.hasMany(models.UserList, { foreignKey: 'userId' }); // A user has many user created lists (one-to-many)
    };

    return User;
};

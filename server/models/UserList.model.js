import { Model } from "sequelize";
// import { Model, DataTypes } from 'sequelize';
// import sequelize from './sequelize';  // Your Sequelize instance

export default (sequelize, DataTypes) => {
    class UserList extends Model {}

    UserList.init(
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
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,    // a user created list must have a title
            validate: 
            {
                notEmpty: true,
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,    // a user created list doesn't have to have a description
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
        modelName: 'UserList',  // The name of the model (which maps to the 'user_lists' table by default)
        tableName: 'user_lists', // Custom table name (optional, default is pluralized model name)
        timestamps: true,     // Automatically manage createdAt and updatedAt columns (default true)
    }
    );

    // Define associations (relationships) here
    UserList.associate = (models) => {
        // associations can be defined here
            UserList.belongsTo(models.User, { foreignKey: 'userId' }); // A user created list belongs to a user (FK)
            UserList.hasMany(models.ListMedia, { foreignKey: 'userListId' }); // A user created list has many medias (one-to-many)
        };

    // Sync the model with the database (create the table if it doesn't exist)
    // sequelize.sync()
    //     .then(() => {
    //         console.log("UserList table has been created (if it didn't exist already).");
    //     })
    //     .catch(err => {
    //         console.error("Error syncing the database:", err);
    //     });

    return UserList;
};
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class UserList extends Model {}

    UserList.init(
    {
        // Columns:
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
    },
    {
        sequelize,            // The Sequelize instance that connects to the database
        modelName: 'UserList',  // The name of the model (which maps to the 'user_lists' table by default)
        tableName: 'user_lists', // Custom table name (optional, default is pluralized model name)
        timestamps: true,     // Automatically manage createdAt and updatedAt columns (default true)
    }
    );

    // Define associations
    UserList.associate = (models) => {
            UserList.belongsTo(models.User, { foreignKey: 'userId' }); // A user created list belongs to a user (FK)
            UserList.hasMany(models.ListMedia, { foreignKey: 'userListId' }); // A user created list has many medias (one-to-many)
        };

    return UserList;
};
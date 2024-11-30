import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize';  // Your Sequelize instance

class ListMedia extends Model { }

ListMedia.init(
{
    // Columns (or attributes) defined here:
    userListId: {
        primaryKey: true,        // Make this a part of the composite primary key
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {            // FK
            model: UserList,    // References the 'UserList' model
            key: 'id',           // The 'id' column in the 'UserList' model
        },
    },
    mediaId: {
        primaryKey: true,        // Make this a part of the composite primary key
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {            // FK
            model: Media,    // References the 'Media' model
            key: 'id',           // The 'id' column in the 'Media' model
        },
    },
    position: { // tells the position of media in the user created list, which is implemented when initialized
        type: DataTypes.INTEGER,
        allowNull: false,    // the order of a media in a list must exist
    },
    addedAt: {
        type: DataTypes.DATE,    // Column type: DATE
        defaultValue: DataTypes.NOW, // Default value: current timestamp
    }
},
{
    sequelize,            // The Sequelize instance that connects to the database
    modelName: 'ListMedia',  // The name of the model (which maps to the 'list_medias' table by default)
    tableName: 'list_medias', // Custom table name (optional, default is pluralized model name)
    timestamps: true,     // Automatically manage addedAt and columns (default true)
}
);

// Define associations (relationships) here
ListMedia.belongsTo(UserList, { foreignKey: 'userListId' }); // each of a list's media belongs to a list (FK)
ListMedia.belongsTo(Media, { foreignKey: 'mediaId' }); // each of a list's media refer to a media (FK)

// Sync the model with the database (create the table if it doesn't exist)
sequelize.sync()
    .then(() => {
        console.log("ListMedia table has been created (if it didn't exist already).");
    })
    .catch(err => {
        console.error("Error syncing the database:", err);
    });

export default ListMedia;

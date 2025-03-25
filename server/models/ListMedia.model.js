import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class ListMedia extends Model { }

    ListMedia.init(
    {
        // Columns (or attributes) defined here:
        userListId: {
            primaryKey: true,        // Make this a part of the composite primary key
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        mediaId: {
            primaryKey: true,        // Make this a part of the composite primary key
            type: DataTypes.INTEGER,
            allowNull: false,
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

    ListMedia.associate = (models) => {
    // associations can be defined here
        ListMedia.belongsTo(models.UserList, { foreignKey: 'userListId' }); // each of a list's media belongs to a list (FK)
        ListMedia.belongsTo(models.Media, { foreignKey: 'mediaId' }); // each of a list's media refer to a media (FK)
    };
    
    return ListMedia;
};

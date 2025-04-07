import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class Media extends Model { }

    Media.init(
    {
        // Columns:
        mediaTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        creatorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        genreId: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        releaseDate: {
            type: DataTypes.DATE,    // Column type: DATE
            allowNull: true,
        }
    },
    {
        sequelize,          // The Sequelize instance that connects to the database
        modelName: 'Media',  // The name of the model (which maps to the 'medias' table by default)
        tableName: 'medias', // Custom table name (optional, default is pluralized model name)
        timestamps: true,   // Automatically manage createdAt and updatedAt columns (default true)
    }
    );

    // Define associations
    Media.associate = (models) => { 
        Media.belongsTo(models.MediaType, { foreignKey: 'mediaTypeId' }); // A media belongs to a media type (FK)
        Media.belongsTo(models.Creator, { foreignKey: 'creatorId' }); // A media belongs to a creator (FK)
        Media.belongsTo(models.Genre, { foreignKey: 'genreId' }); // A media belongs to a genre (FK)
        Media.hasMany(models.Review, { foreignKey: 'mediaId' }); // A media has many reviews (one-to-many)
        Media.hasMany(models.ListMedia, { foreignKey: 'mediaId' }); // A media is in many lists (one-to-many)
    };

    return Media;
};
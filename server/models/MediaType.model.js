import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class MediaType extends Model { }

    MediaType.init(
    {
        // Columns:
        mediaType: {
            type: DataTypes.STRING,  // Column type: STRING (VARCHAR)
            allowNull: false,        // Media type cannot be NULL
        }
    },
    {
        sequelize,                // The Sequelize instance that connects to the database
        modelName: 'MediaType',   // The name of the model (which maps to the 'media_types' table by default)
        tableName: 'media_types', // Custom table name (optional, default is pluralized model name)
        timestamps: false,
    }
    );

    // Define associations
    MediaType.associate = (models) => {
        MediaType.hasMany(models.Media, { foreignKey: 'mediaTypeId' }); // A media type has many medias (one-to-many)
    };

    const createMediaTypesIfNotExist = async () => {
        try {
            const { count } = await MediaType.findAndCountAll();
            if (count === 0) {
                await MediaType.bulkCreate([
                {       // id: 0
                    mediaType: 'Book'
                },
                {       // id: 1
                    mediaType: 'Movie'
                },
                {       // id: 2
                    mediaType: 'TV Show'
                }
                ]);
                console.log('Media types table init: SUCCESS');            
            } else {
                console.log("Media types table already contains data, skipping init.");
            }
        } catch (error) {
            console.error('ERROR initialing media types:', error);
        }
    };
        
    createMediaTypesIfNotExist();

    return MediaType;
};
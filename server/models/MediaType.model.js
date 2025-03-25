import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class MediaType extends Model { }

    MediaType.init(
    {
        // Columns (or attributes) defined here:
        id: {
            type: DataTypes.INTEGER, // Column type: INTEGER
            primaryKey: true,        // Make this the primary key
            autoIncrement: true,     // Auto-increment the id
        },
        mediaType: {
            type: DataTypes.STRING,  // Column type: STRING (VARCHAR)
            allowNull: false,        // Media type cannot be NULL
        }
    },
    {
        sequelize,                // The Sequelize instance that connects to the database
        modelName: 'MediaType',   // The name of the model (which maps to the 'media_types' table by default)
        tableName: 'media_types', // Custom table name (optional, default is pluralized model name)
        // timestamps: false,
    }
    );

    // Define associations (relationships) here
    MediaType.associate = (models) => {
        // associations can be defined here
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
                    console.log('Media types table initialized!');            
                } else {
                    console.log("Media types table already contains data, skipping initialization");
                }
            } catch (error) {
                console.error('Error initialing media types:', error);
            }
    };
        
    createMediaTypesIfNotExist();

    return MediaType;
};
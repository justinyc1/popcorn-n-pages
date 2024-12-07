import { Model } from "sequelize";
// import { Model, DataTypes } from 'sequelize';
// import sequelize from './sequelize';  // Your Sequelize instance

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
}
);

// Define associations (relationships) here
MediaType.hasMany(Movie, { foreignKey: 'mediaTypeId' }); // A media type has many medias (one-to-many)

// Sync the model with the database (create the table if it doesn't exist)
sequelize.sync()
    .then(() => {
        console.log("MediaType table has been created (if it didn't exist already).");
    })
    .catch(err => {
        console.error("Error syncing the database:", err);
    });

// create the media types
const createMediaTypes = async () => {
    try {
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
        console.log('Media types initialized!');
    } catch (error) {
        console.error('Error initialing media types:', error);
    }
};
    
createMediaTypes();

export default MediaType;

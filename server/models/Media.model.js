import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize';  // Your Sequelize instance

class Media extends Model { }

Media.init(
{
    // Columns (or attributes) defined here:
    id: {
        type: DataTypes.INTEGER, // Column type: INTEGER
        primaryKey: true,        // Make this the primary key
        autoIncrement: true,     // Auto-increment the id
    },
    mediaTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {            // FK
            model: MediaType,    // References the 'MediaType' model
            key: 'id',           // The 'id' column in the 'MediaType' model
        },
    },
    creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {            // FK
            model: Creator,    // References the 'Creator' model
            key: 'id',           // The 'id' column in the 'Creator' model
        },
    },
    genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {            // FK
            model: Genre,    // References the 'Genre' model
            key: 'id',           // The 'id' column in the 'Genre' model
        },
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
        defaultValue: '0000-00-00',
    }
},
{
    sequelize,          // The Sequelize instance that connects to the database
    modelName: 'Media',  // The name of the model (which maps to the 'medias' table by default)
    tableName: 'medias', // Custom table name (optional, default is pluralized model name)
    timestamps: true,   // Automatically manage createdAt and updatedAt columns (default true)
}
);

// Define associations (relationships) here
Media.belongsTo(MediaType, { foreignKey: 'mediaTypeId' }); // A media belongs to a media type (FK)
Media.belongsTo(Creator, { foreignKey: 'creatorId' }); // A media belongs to a creator (FK)
Media.belongsTo(Genre, { foreignKey: 'genreId' }); // A media belongs to a genre (FK)
Media.hasMany(Review, { foreignKey: 'mediaId' });

// Sync the model with the database (create the table if it doesn't exist)
sequelize.sync()
    .then(() => {
        console.log("Media table has been created (if it didn't exist already).");
    })
    .catch(err => {
        console.error("Error syncing the database:", err);
    });

export default Media;

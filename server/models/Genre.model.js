import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize';  // Your Sequelize instance

class Genre extends Model { }

Genre.init(
{
    // Columns (or attributes) defined here:
    id: {
        type: DataTypes.INTEGER, // Column type: INTEGER
        primaryKey: true,        // Make this the primary key
        autoIncrement: true,     // Auto-increment the id
    },
    genre: {
        type: DataTypes.STRING,  // Column type: STRING (VARCHAR)
        allowNull: false,        // Genre cannot be NULL
    }
},
{
    sequelize,           // The Sequelize instance that connects to the database
    modelName: 'Genre',  // The name of the model (which maps to the 'genres' table by default)
    tableName: 'Genres', // Custom table name (optional, default is pluralized model name)
}
);

// Define associations (relationships) here
Genre.hasMany(Movie, { foreignKey: 'genreId' }); // A genre has many medias (one-to-many)

// Sync the model with the database (create the table if it doesn't exist)
sequelize.sync()
    .then(() => {
        console.log("Genre table has been created (if it didn't exist already).");
    })
    .catch(err => {
        console.error("Error syncing the database:", err);
    });

export default Genre;

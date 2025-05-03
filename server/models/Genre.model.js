import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class Genre extends Model {}

    Genre.init(
    {
        // Columns:
        genre: {
            type: DataTypes.STRING,  // Column type: STRING (VARCHAR)
            allowNull: false,        // Genre cannot be NULL
        }
    },
    {
        sequelize,           // The Sequelize instance that connects to the database
        modelName: 'Genre',  // The name of the model (which maps to the 'genres' table by default)
        tableName: 'genres', // Custom table name (optional, default is pluralized model name)
    }
    );

    // Define associations
    Genre.associate = (models) => {
        Genre.hasMany(models.Media, { foreignKey: 'genreId' }); // A genre has many medias (one-to-many)
    };

    return Genre;
};

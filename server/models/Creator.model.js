import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class Creator extends Model {}

    Creator.init(
    {
        // Columns:
        firstName: {
            type: DataTypes.STRING,  // Column type: STRING (VARCHAR)
            allowNull: false,        // First name cannot be NULL
        },
        lastName: {
            type: DataTypes.STRING,  // Column type: STRING (VARCHAR)
            allowNull: false,        // Last name cannot be NULL
        }
    },
    {
        sequelize,             // The Sequelize instance that connects to the database
        modelName: 'Creator',  // The name of the model (which maps to the 'creators' table by default)
        tableName: 'creators', // Custom table name (optional, default is pluralized model name)
    }
    );
    
    // Define associations
    Creator.associate = (models) => {
        Creator.hasMany(models.Media, { foreignKey: 'creatorId' }); // A creator has many medias (one-to-many)
    };

    return Creator;
};
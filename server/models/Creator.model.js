import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class Creator extends Model {}

    Creator.init(
    {
        // Columns (or attributes) defined here:
        id: {
            type: DataTypes.INTEGER, // Column type: INTEGER
            primaryKey: true,        // Make this the primary key
            autoIncrement: true,     // Auto-increment the id
        },
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

    Creator.associate = (models) => {
    // associations can be defined here
        Creator.hasMany(models.Movie, { foreignKey: 'creatorId' }); // A creator has many medias (one-to-many)
    };

    return Creator;
};

// import { Model, DataTypes } from 'sequelize';
// import sequelize from 'sequelize';  // Your Sequelize instance

// class Creator extends Model { }

// Creator.init(
// {
//     // Columns (or attributes) defined here:
//     id: {
//         type: DataTypes.INTEGER, // Column type: INTEGER
//         primaryKey: true,        // Make this the primary key
//         autoIncrement: true,     // Auto-increment the id
//     },
//     firstName: {
//         type: DataTypes.STRING,  // Column type: STRING (VARCHAR)
//         allowNull: false,        // First name cannot be NULL
//     },
//     lastName: {
//         type: DataTypes.STRING,  // Column type: STRING (VARCHAR)
//         allowNull: false,        // Last name cannot be NULL
//     }
// },
// {
//     sequelize,             // The Sequelize instance that connects to the database
//     modelName: 'Creator',  // The name of the model (which maps to the 'creators' table by default)
//     tableName: 'creators', // Custom table name (optional, default is pluralized model name)
// }
// );

// // Define associations (relationships) here
// Creator.hasMany(Movie, { foreignKey: 'creatorId' }); // A creator has many medias (one-to-many)

// // Sync the model with the database (create the table if it doesn't exist)
// sequelize.sync()
//     .then(() => {
//         console.log("Creator table has been created (if it didn't exist already).");
//     })
//     .catch(err => {
//         console.error("Error syncing the database:", err);
//     });

// export default Creator;
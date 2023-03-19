const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  return sequelize.define('type', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, 
  {
      timestamps: false
  });
};

























// const {DataTypes} = require('sequelize');

// module.exports = (sequelize) => {
//     sequelize.define('type',{
//         id: {
//             type: DataTypes.UUID,
//             primaryKey: true,
//             defaultValue: DataTypes.UUIDV4
//           },
//           name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true
//           },
//     }, 
//     {
//         timestamps: false
//     })
// }
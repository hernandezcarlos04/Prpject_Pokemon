const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("pokemon", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hp: {
      /*Vida */ type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    str: {
      /*Ataque */ type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    def: {
      /*defensa */ type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    agi: {
      /*velocidad */ type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    height: {
      /*altura */ type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    weight: {
      /* Peso */ type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    timestamps: false
  });
};

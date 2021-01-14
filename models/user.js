const { DataTypes, Sequelize } = require('sequelize');
const database = require('../db');

const User = database.define('user', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  restaurantOwner: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  //use JSON object in postgres
});

module.exports = User;

// further research
//https://www.codementor.io/@mirko0/how-to-use-sequelize-with-node-and-express-i24l67cuz
//https://www.geeksforgeeks.org/express-js-app-render-function/

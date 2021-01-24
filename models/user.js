module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
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
    restaurantowner: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  });
  return User;
};

// further research
//https://www.codementor.io/@mirko0/how-to-use-sequelize-with-node-and-express-i24l67cuz
//https://www.geeksforgeeks.org/express-js-app-render-function/

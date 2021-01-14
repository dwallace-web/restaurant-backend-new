module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('restaurant', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phonenumber: {
      type: DataTypes.STRING,
      unique: false,
    },
    socialmedia: {
      type: DataTypes.JSONB,
      unique: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Restaurant;
};
//https://sequelize.org/master/manual/other-data-types.html#json--sqlite--mysql--mariadb-and-postgresql-only-
//JSONB for use any operations on the json value

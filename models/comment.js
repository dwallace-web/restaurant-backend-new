module.exports = (sequelize, DataTypes) => {
  Comment = sequelize.define('comment', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
  });
  return Comment;
};

//https://sequelize.org/master/manual/other-data-types.html#json--sqlite--mysql--mariadb-and-postgresql-only-
//JSONB for use any operations on the json value

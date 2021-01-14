const { DataTypes } = require('sequelize')
const database = require('../db')

module.exports = database.define('comment', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    }
})

//https://sequelize.org/master/manual/other-data-types.html#json--sqlite--mysql--mariadb-and-postgresql-only-
//JSONB for use any operations on the json value

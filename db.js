const Sequelize = require('sequelize');

const database = new Sequelize(process.env.NAME, 'postgres', process.env.PASS, {
  host: 'localhost',
  dialect: 'postgres',
});

database
  .authenticate()
  .then(() => console.log('postgres is working'))
  .catch((err) => console.log('postgres is NOT working', err));

const User = database.import('./models/user');
const Restaurant = database.import('./models/restaurant');
const Comment = database.import('./models/comment');

Restaurant.hasMany(Comment);
User.hasMany(Comment);
Comment.belongsTo(User);
Comment.belongsTo(Restaurant);

module.exports = database;

const Sequelize = require('sequelize');

// const database = new Sequelize(process.env.NAME, 'postgres', process.env.PASS, {
//   host: 'localhost',
//   dialect: 'postgres',
// });

const database = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // <<<<<<< YOU NEED THIS TO FIX UNHANDLED REJECTION 
    },
  },
});

database
  .authenticate()
  .then(() => console.log('postgres is working'))
  .catch((err) => console.log('postgres is NOT working', err));

const User = database.import('./models/user');
const Restaurant = database.import('./models/restaurant');
const Comment = database.import('./models/comment');

User.hasMany(Restaurant);
Restaurant.belongsTo(User);

Restaurant.hasMany(Comment);
User.hasMany(Comment);

Comment.belongsTo(User);
Comment.belongsTo(Restaurant);

module.exports = database;

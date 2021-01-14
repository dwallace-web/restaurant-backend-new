require('dotenv').config();
const Express = require('express');
const app = Express();
const database = require('./db');

database.sync();

app.use(Express.json());
app.use(require('./middlewares/cors'));

app.use(Express.json());

const usercontroller = require('./controllers/userController');
app.use('/user', usercontroller);

const commentcontroller = require('./controllers/commentController');
app.use('/comment', commentcontroller);

const restaurantcontroller = require('./controllers/restaurantController');
app.use('restuarant', restaurantcontroller);

app.listen(process.env.PORT, () =>
  console.log(`App is listening on the Port number: ${process.env.PORT}`)
);

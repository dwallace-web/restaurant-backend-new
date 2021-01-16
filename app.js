require('dotenv').config();
const Express = require('express');
const app = Express();
const database = require('./db');

database.sync();
// database.sync({ force: true });

app.use(Express.json());
app.use(require('./middleware/headers'));

app.use(Express.static(__dirname + '/public'));
app.get('/', (request, response) => response.render('index'));

const usercontroller = require('./controllers/userController');
app.use('/user', usercontroller);

const commentcontroller = require('./controllers/commentController');
app.use('/comment', commentcontroller);

const restaurantcontroller = require('./controllers/restaurantController');
app.use('/restaurant', restaurantcontroller);

app.listen(process.env.PORT, () =>
  console.log(`App is listening on the Port number: ${process.env.PORT}`)
);

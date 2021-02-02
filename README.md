# Restaurant App Demo Back-end

This was my final project for the 11-50 academy red badge course. The goal of this project was to demonstrate full CRUD ont the backend for at least two objects and create database associations.

This README details the back-end portion of this project. This application has three key objects
1) Users 
2) Restaurants
3) Comments

Upon registration, users are able to select if they would like to be considered business owners. When that happens a column in the Postgres database determines whether than user should be labeled an administrator.

Business owners are allowed to have administrative capabilites which allows them to create, edit or update restaurants.

Business owners can create, edit or delete comments they've created. Standard customers are allowed to create, edit or delete comment they've created. Business owners are only allowed manage their restaurants. Customers can comment, edit or delete their comments on restaurants made by any business owner.

Upon authentification, users are provided a token with the following:

```
user: user,
message: 'User registered!',
sessionToken: token,
login: true,
```

Some of the technologies used to build this front-end include (but are not limited to):

* Node.js & Express
* Sequlize & PG (npm packages)
* bcryptjs & jwt tokens to encrypt user passwords and login

Additional npm technologies can be viewed in the package.json file listed.

[View the full application here.](https://restaurant-front-end.herokuapp.com/)
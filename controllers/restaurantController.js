const { Router, response } = require('express');
const { Restaurant } = require('../models');
const restaurant = require('../models/restaurant');
const restaurantController = Router();

//get all restaurants
restaurantController.get('/', async (req, res) => {
    try {
        await
            Restaurant.findAll()
                .then(restaurants =>
                    res.status(200).json({
                        message: 'Restaurants Found',
                        data: restaurants
                    })

                )
    } catch (e) {
        res.status(500).json({ error: e })
    }
})

//get single restaurant
restaurantController.get('/:id', async (req, res) => {
    try {
        await
            Restaurant.findOne({
                where: { id: req.params.id }
            })
                .then(restaurant =>
                    res.status(200).json({
                        message: 'View One Restaurant',
                        data: restaurant
                    })

                )
    } catch (e) {
        res.status(500).json({ error: e })
    }
})

//get restaurant by category
restaurantController.get('/category/:id', async (req, res) => {
    try {
        await
            Restaurant.findAll({
                where: { category: req.params.id }
            })
                .then(restaurants =>
                    res.status(200).json({
                        message: 'Restaurants Found',
                        data: restaurants
                    })

                )
    } catch (e) {
        res.status(500).json({ error: e })
    }
})

restaurantController.post('/', async (req, res) => {
    try {
        // console.log(req);
        await
            Restaurant
                .create(
                    {
                        userId: req.user.id,
                        name: req.body.name,
                        address: req.body.address,
                        phoneNumber: req.body.phonenumber,
                        socialmedia: req.body.socialmedia,
                        category: req.body.category
                    }
                )
        res.status(200).json({
            message: 'New Restaurant Created!'
        })

    } catch (e) {
        res.status(500).json({ error: e })
    }
})

restaurantController.put('/:id', async (req, res) => {
    try {

        const query = { where: { id: req.params.id, userId: req.user.id } };
        const updatedDetails = {
            name: req.body.name,
            address: req.body.address,
            phoneNumber: req.body.phonenumber,
            socialmedia: req.body.socialmedia,
            category: req.body.category
        }
        Restaurant
            .update(updatedDetails, query)
            .then(updates =>
                res.status(200).json({
                    message: 'Edited Restaurant',
                    data: updates
                })

            )
    } catch (e) {
        res.status(500).json({ error: e })
    }
})

restaurantController.delete('/:id', async (req, res) => {
    try {
        const query = { where: { id: req.params.id, userId: req.user.id } };

        Restaurant
            .destroy(query)
            .then(() => res.status(200).json({
                message: 'Restaurant was deleted',
            })

            )
    } catch (e) {
        res.status(500).json({ error: e })
    }
})



module.exports = restaurantController;
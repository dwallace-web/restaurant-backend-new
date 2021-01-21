const router = require('express').Router();
const Restaurant = require('../db').import('../models/restaurant');

//get all restaurants
router.get('/', async (req, res) => {
  try {
    await Restaurant.findAll().then((restaurants) =>
      res.status(200).json({
        message: 'Restaurants Found',
        data: restaurants,
      })
    );
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

//get single restaurant
router.get('/location/:id', async (req, res) => {
  try {
    await Restaurant.findOne({
      where: { id: req.params.id },
    }).then((restaurant) =>
      res.status(200).json({
        message: 'View One Restaurant',
        data: restaurant,
      })
    );
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

const validateSession = require('../middleware/validate-session');

//get restaurant by category
router.get('/category/:id', validateSession, async (req, res) => {
  try {
    await Restaurant.findAll({
      where: { category: req.params.id },
    }).then((restaurants) =>
      res.status(200).json({
        message: 'Restaurants Found',
        data: restaurants,
      })
    );
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

//get restaurants by user
router.get('/user', validateSession, async (req, res) => {
  // console.log(req);

  let userid = req.user.id;

  Restaurant.findAll({
    where: { userId: userid },
  })
    .then((restaurant) => res.status(200).json(restaurant))
    .catch((err) => res.status(500).json({ error: err }));
});

router.post('/', validateSession, async (req, res) => {
  try {
    // console.log(req);
    await Restaurant.create({
      userId: req.user.id,
      name: req.body.name,
      address: req.body.address,
      phonenumber: req.body.phonenumber,
      socialmedia: req.body.socialmedia,
      category: req.body.category,
    }).then((restaurant) => {
      res.status(200).json({
        message: 'New Restaurant Created!',
        restaurant: restaurant,
      });
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.put('/:id', validateSession, async (req, res) => {
  try {
    const query = { where: { id: req.params.id, userId: req.user.id } };
    const updatedDetails = {
      name: req.body.name,
      address: req.body.address,
      phonenumber: req.body.phonenumber,
      socialmedia: req.body.socialmedia,
      category: req.body.category,
    };
    Restaurant.update(updatedDetails, query).then((updates) =>
      res.status(200).json({
        message: 'Edited Restaurant',
        data: updates,
      })
    );
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.delete('/:id', validateSession, async (req, res) => {
  try {
    const query = { where: { id: req.params.id, userId: req.user.id } };

    Restaurant.destroy(query).then(() =>
      res.status(200).json({
        message: 'Restaurant was deleted',
      })
    );
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;

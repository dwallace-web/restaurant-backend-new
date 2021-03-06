const router = require('express').Router();
const Comment = require('../db').import('../models/comment');

//get all comments
router.get('/', async (req, res) => {
  try {
    await Comment.findAll().then((comments) =>
      res.status(200).json({
        message: 'Comments Found',
        data: comments,
      })
    );
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

//get comments by restaurant
router.get('/restaurant/:id', async (req, res) => {
  try {
    await Comment.findAll({
      where: { restaurantId: req.params.id },
    }).then((comments) =>
      res.status(200).json({
        message: 'Comments Found',
        data: comments,
      })
    );
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

const validateSession = require('../middleware/validate-session');

//get comments by user
router.get('/user/', validateSession, async (req, res) => {
  let userid = req.user.id;

  try {
    await Comment.findAll({
      where: { userId: userid },
    }).then((comments) =>
      res.status(200).json({
        message: 'Comments Found',
        data: comments,
      })
    );
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post('/', validateSession, async (req, res) => {
  try {
    // console.log(req);
    await Comment.create({
      title: req.body.title,
      body: req.body.body,
      userId: req.user.id,
      restaurantId: req.body.restaurantid,
    }).then((updates) =>
      res.status(200).json({
        message: 'New comment Created!',
        data: updates,
      })
    );
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.put('/restaurant/:id', validateSession, async (req, res) => {
  try {
    const query = { where: { id: req.params.id, userId: req.user.id } };

    const updatedComment = {
      title: req.body.title,
      body: req.body.body,
    };
    Comment.update(updatedComment, query).then((updates) =>
      res.status(200).json({
        message: 'Edited comment',
        data: updates,
      })
    );
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.delete('/restaurant/:id', validateSession, async (req, res) => {
  try {
    const query = { where: { id: req.params.id, userId: req.user.id } };

    Comment.destroy(query).then((deleted) =>
      res.status(200).json({
        message: 'comment was deleted',
        data: deleted,
      })
    );
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;

const { Router, response } = require('express');
const { Comment } = require('../models');
const commentController = Router();

//get all comments
commentController.get('/', async (req, res) => {
    try {
        await
        Comment.findAll()
                .then(comments =>
                    res.status(200).json({
                        message: 'Comments Found',
                        data: comments
                    })

                )
    } catch (e) {
        res.status(500).json({ error: e })
    }
})

//get comments by restaurant
commentController.get('/:id', async (req, res) => {
    try {
        await
        Comment.findAll({
            where: { restaurantId: req.params.id}
        })
                .then(comments =>
                    res.status(200).json({
                        message: 'Comments Found',
                        data: comments
                    })

                )
    } catch (e) {
        res.status(500).json({ error: e })
    }
})

commentController.post('/', async (req, res) => {
    try {
        // console.log(req);
        await
            Comment
                .create(
                    {
                        title: req.body.title,
                        body: req.body.body,
                        userId: req.user.id,
                        restaurantId: req.body.restaurantid
                    }
                )
                .then(updates =>
                    res.status(200).json({
                        message: 'New comment Created!',
                        data: updates
                    })

                )
    } catch (e) {
        res.status(500).json({ error: e })
    }
})

commentController.put('/:id', async (req, res) => {
    try {

        const query = { where: { id: req.params.id, userId: req.user.id} };

        const updatedComment = {
            title: req.body.title,
            body: req.body.body
        }
        Comment
            .update(updatedComment, query)
            .then(updates =>
                res.status(200).json({
                    message: 'Edited comment',
                    data: updates
                })
            )
    } catch (e) {
        res.status(500).json({ error: e })
    }
})

commentController.delete('/:id', async (req, res) => {
    try {
        const query = { where: { id: req.params.id, userId: req.user.id } };

        Comment
            .destroy(query)
            .then(deleted => res.status(200).json({
                message: 'comment was deleted',
                data: deleted
            })

            )
    } catch (e) {
        res.status(500).json({ error: e })
    }
})



module.exports = commentController;
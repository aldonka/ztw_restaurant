/**
 * Created by Dominika on 2016-11-28.
 */
var category = require('./model');
var router = require('express').Router();

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

function getCategories(req, res) {
        category.findAll(function (error, categories) {
            if (error) {
                log.error(error, 'error finding categories');
                res.status(500).send(error);
                return
            }
            res.json(categories)
        });

}

function createCategory(req, res) {
    if (!(req.body.id || req.body.name)) {
        handleError(res, "Invalid user input", "Must provide a id or name.", 400);
    }
    category.create(req.body, function (err, category) {
        if(err){return next(err)}

        res.json(category);
        // res.status(201).send()
    });
}

function getById(req, res) {
    category.findById(req.params.id, function (err, doc) {
        if (err) {
            res.status(500).send(err);
            return
        }
        else {
            res.status(200).json(doc);
        }
    })
}

router.post('/categories', createCategory);
router.get('/categories', getCategories);
router.get('/categories/:id', getById);

module.exports = router;
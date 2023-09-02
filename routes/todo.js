var express = require('express');
var router = express.Router();
var todoDB = require('../models/todoDB');

const databaseName = "Todo";
const collectionName = "Todo";

router.get('/', async(req, res, next) => {
    var itemsArray = await todoDB.readDocument(databaseName, collectionName);
    res.render('todo', {todos: itemsArray});
});

router.post('/', async(req, res, next) => {
    var inputData = req.body;

    if(inputData.item) {
        try {
            var response = await todoDB.createDocument(databaseName, collectionName, inputData);
            res.send(response);
        } catch (error) {
            console.error(error);
            res.status(500).send({ status: 'Internal server error' });
        }
    } else {
        res.status(400).send({ status: 'Invalid input data' });
    }
});

router.delete('/:itemName', async(req, res, next) => {
    var deleteItem = {item: req.params.itemName.replace(/\-/g, " ")};
    var response = await todoDB.deleteDocument(databaseName, collectionName, deleteItem);
    res.send(response);
});

module.exports = router;
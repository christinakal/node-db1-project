const express = require('express');
const db = require('../data/dbConfig');

const router = express.Router();


router.get('/', (req, res) => {
    db('accounts')
        .then( accounts => {
            res.status(200).json(accounts);
        })
        .catch( error => {
            console.log(error);
            res.status(500).json({message: 'There was an error getting accounts'})
        });
})

router.get("/:id", (req, res) => {
    db("accounts")
        .where({id: req.params.id})
        .first()
        .then(account => {
            res.status(200).json(account);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "There was an error getting this account" })
        });
});

module.exports = router;

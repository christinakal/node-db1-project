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

router.post("/", (req, res) => {
    db("accounts")
        // .insert(req.body, "id")
        .insert(req.body)
        .then(account => {
            res.status(201).json(account)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "failed to add the account" })
        });
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    db("accounts")
        .where({ id })
        .update(changes)
        .then(count => {
            res.status(200).json(count);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "failed to update the account" })
        });
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    db("accounts")
        .where({ id })
        .del()
        .then(count => {
            res.status(200).json(count);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "failed to delete the account" })
        });
});
module.exports = router;

const dataService = require('../services/dataService');
const express = require('express');
const router = express.Router();

router.get('/search',  (req, res) => {
    dataService.search(req)
                .then(data => res.json(data));
});

router.get('/insert',  (req, res) => {
    dataService.insert(req)
                .then(data => res.json(data));
});

router.get('/delete', (req, res) => {
    dataService.deleteEntry(req)
               .then(data => res.json(data));
})

router.get('/update', (req, res) => {
    dataService.update(req)
               .then(data => res.json(data));
});

module.exports = router;
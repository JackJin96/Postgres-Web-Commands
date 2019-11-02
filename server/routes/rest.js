const dataService = require('../services/dataService');
const express = require('express');
const router = express.Router();

// router.get('/drugs', (req, res) => {
//     dataService.getDrugs(req)
//                 .then(data => {
//                     res.json(data);
//                 });
// });

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

// GET single methods
// router.get('/drug', (req, res) => {
//     dataService.getDrug(req)
//                 .then(data => res.json(data));
// });

// router.get('/mechanism', (req, res) => {
//     dataService.getMechanism(req)
//                 .then(data => res.json(data));
// });

// router.get('/record', (req, res) => {
//     dataService.getRecord(req)
//                 .then(data => res.json(data));
// });

// // POST methods
// router.post('/drug', (req, res) => {
//     dataService.addDrug(req.body)
//                 .then(data => res.json(data))
//                 .catch(err => res.json(err));
// });

// router.post('/mechanism', (req, res) => {
//     dataService.addMechanism(req.body)
//                 .then(data => res.json(data))
//                 .catch(err => res.json(err));
// });

// router.post('/record', (req, res) => {
//     dataService.addRecord(req.body)
//                 .then(data => res.json(data))
//                 .catch(err => res.json(err));
// });

// router.post('/combined', (req, res) => {
//     dataService.addCombined(req.body)
//                 .then(data => res.json(data))
//                 .catch(err => res.json(err));
// });

module.exports = router;
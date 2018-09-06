const express = require('express');
const router = express.Router();

router.post('/group', function (req, res) {

});

router.put('/group', function (req, res) {
});


router.delete('/group/:groupId', function (req, res) {

});

// attach an entity to a group
router.post('/group/attach', function (req, res) {

});

// unattach an entity to a group
router.post('/group/unattach', function (req, res) {

});


module.exports = router;
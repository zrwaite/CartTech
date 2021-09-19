const express = require('express');
const router = express.Router();
const userCtrl = require('../api/user');

router.route('/')
    .get(userCtrl.apiGetUser)

module.exports = router;
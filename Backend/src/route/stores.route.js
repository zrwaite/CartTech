const express = require('express');
const router = express.Router();
const storesCtrl = require('../api/stores');

router.route('/')
    .get(storesCtrl.apiGetStores)

module.exports = router;
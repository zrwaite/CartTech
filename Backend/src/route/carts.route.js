const express = require('express');
const router = express.Router();
const cartsCtrl = require('../api/carts');

router.route('/')
    .get(cartsCtrl.apiGetCarts)

module.exports = router;
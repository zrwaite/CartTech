const express = require('express');
const router = express.Router();
const ordersCtrl = require('../api/orders');

router.route('/')
    .get(ordersCtrl.apiGetOrders)

module.exports = router;
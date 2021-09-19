const express = require('express');
const router = express.Router();
const ordersCtrl = require('../api/orders');

router.route('/')
    .get(ordersCtrl.apiGetOrders)
    .post(ordersCtrl.apiPostOrders)

module.exports = router;
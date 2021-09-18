const express = require('express');
const router = express.Router();
const purchaseCtrl = require('../api/purchase');

router.route('/')
    .post(purchaseCtrl.apiPostPurchase)

module.exports = router;
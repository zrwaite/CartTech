const express = require('express');
const router = express.Router();
const productsCtrl = require('../api/products');

router.route('/')
    .get(productsCtrl.apiGetProducts)

module.exports = router;
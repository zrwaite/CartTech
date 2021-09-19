const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const folderPath = path.join(__dirname, '..', '..', 'files')

router.route('*')
    .get(
        (req, res) => {
            if (req.url !== "/" && fs.existsSync(folderPath + req.url)){
                res.status(200).sendFile(req.url, {root: folderPath})
            } else {
                res.status(404).json("404 File not found");
            }
        }
    );

module.exports = router;

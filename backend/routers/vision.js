
const { analyze } = require('../controllers/vision');
const router = require('express').Router();

router.post("/analyze", analyze);

module.exports = router;



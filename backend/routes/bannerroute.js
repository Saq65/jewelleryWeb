const express = require("express");
const {HomeBanner,ShowBanner} = require('../controllers/bannercontroller');

const router = express.Router();

router.post('/addbanner',HomeBanner);
router.get('/showbanner',ShowBanner);

module.exports = router;

const express = require("express");
const router = express.Router();
const City = require("../../model/customer/cities");
router.post("/cities", async (req, resp) => {
    try {
        const city = new City({
            ...req.body,
        });
        await city.save();
        resp.json({
            success: true,
            msg: "City Data",
            data: city,
        });
    } catch (err) {
        resp.json({
            success: false,
            msg: err.message,
        });
    }
});
router.get("/cities", async (req, resp) => {
    try {
        const {cityName} = req.body;
        const city = await City.find({
            cityName: cityName,
        });
        resp.json({
            success: true,
            msg: "City Data",
            data: city,
        });
    } catch (err) {
        resp.json({
            success: false,
            msg: err.message,
        });
    }
});

module.exports = router;
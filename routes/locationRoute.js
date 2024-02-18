const express = require("express");
const router = express.Router();
const Location = require("../models/location");

router.get("/getalllocations", async (req, res) => {
  try {
    const locations = await Location.find({}); 
    res.json({ locations });  
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/getlocationbyid", async (req, res) => {
  const locationid = req.body.locationid;

  try {
    const location = await Location.findOne({ _id: locationid });  
    res.json({ location });  
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

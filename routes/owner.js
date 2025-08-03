const ownerValidationSchema = require("../validations/owner.validation");
const ownerModel = require("../models/owner-model");
var express = require("express");
var router = express.Router();
/* GET users listing. */
router.get("/", function (req, res) {
  res.send("hey");
});
if (process.env.NODE_ENV == "development") {
  router.post("/create", async function (req, res) {
    const { error } = ownerValidationSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    let owners = await ownerModel.find();
    if (owners.length > 0)
      return res.status(503).send("Permission Denied: Owner Exists");
    res.send("all is good")
  });
}

module.exports = router;

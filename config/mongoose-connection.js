const mongoose = require("mongoose");
const config = require("config");
const dbgr= require("debug")("development:Mongoose")
mongoose
  .connect(`${config.get("MONGODB_URI")}/scatch`)
  .then(function () {
    dbgr("MongoDB Connected");
  })
  .catch(function (err) {
    dbgr(err);
  });

  module.exports=mongoose.connection;
require("dotenv").config();
const mongoose = require("mongoose");
const dbgr = require("debug")("development:Mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => dbgr("MongoDB Connected"))
  .catch((err) => dbgr("MongoDB Error:", err));

module.exports = mongoose.connection;

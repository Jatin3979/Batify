
const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  cart: {
    typeof: Array,
    default: [],
  },
  isadmin: Boolean,
  orders: {
    typeof: Array,
    default: [],
  },
  contact: Number,
  picure: String,
});

module.exports = mongoose.model("user", userSchema);

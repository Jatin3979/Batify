const ownerSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,

  products: {
    typeof: Array,
    default: [],
  },
  contact: Number,
  picure: String,
  gstin:String,
});

module.exports = mongoose.model("owner", ownerSchema);

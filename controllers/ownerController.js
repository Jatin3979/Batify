module.exports.createProducts=(req,res)=>{
  let success=req.flash("success");
  res.render("createproducts",{success})
}
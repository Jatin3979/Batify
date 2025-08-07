module.exports.isAdmin = function (req, res, next) {
  // Check if the user is authenticated and is an admin
  if (req.user && req.user.isAdmin) {
    return next(); // allow access
  } else {
    // If not an admin, block access
    req.flash("error", "Access Denied: Admins only.");
    return res.redirect("/"); // or send 403 if you're using an API
  }
};

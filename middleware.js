const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");


module.exports.isLoggedIn = (req,res,next)=>{
     if (!req.isAuthenticated()) {
    
    req.session.redirectUrl = req.originalUrl;
    req.flash("error","You must be logged in!");
    return res.redirect("/login");   
  }
  next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){

    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  
  if (!listing) {
    req.flash("error", "Listing not found.");
    return res.redirect("/listings");
  }

  if (!listing.owner || !req.user || !listing.owner.equals(req.user._id)) {
    req.flash("error", "You don't have permission to perform this action.");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

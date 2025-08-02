const User = require("../models/user");


module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    //await newUser.save();
    req.login(registeredUser,(err)=>{
      if(err){
        return next (err);
      }
    })
    req.flash("success", "Welcome to wonderlust");
    res.redirect("/listings");
  } catch (e) {
    req.flash("error",e.message);
    res.redirect("/signup");
  }
}

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome to wonderlust you are logged in!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
   // req.flash("success", "Welcome back!");
  res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next) => {
 req.logout((err)=>{
  if(err){
    return next(err);
  }
  req.flash("success","you are logged out!");
  res.redirect("/listings");
 })
}

module.exports.search = async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim() === "") {
    return res.redirect("/listings");
  }

  const listings = await Listing.find({
    $or: [
      { title: { $regex: q, $options: "i" } },
      { location: { $regex: q, $options: "i" } }
    ]
  });

  res.render("listings/index", {
    allListing: listings,
    success: null,
    error: listings.length === 0 ? "No listings found!" : null
  });
};
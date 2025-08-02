const Listing = require("../models/listing")

module.exports.index = async (req,res) =>{ 
  const allListing = await Listing.find({});
  res.render("listings/index.ejs", { allListing });
}

module.exports.renderNewForm = async(req,res)=>{

  res.render("listings/new.ejs");

}

module.exports.show = async (req, res) => {

  const { id } = req.params;
  const listing = await Listing.findById(id).populate("owner");
  if (!listing) {
    req.flash("error", "Listing you are requested for does not exists!");
    return res.redirect("/listings");
  }
  console.log(req.user);
  console.log(listing);
  res.render("listings/show.ejs", { listing,currUser: req.user });

}

module.exports.submit = async (req, res, next) => {

  let url = req.file.path;
  let filename = req.file.filename;
  const newlisting = new Listing(req.body.listing);
  newlisting.owner = req.user._id;
  newlisting.image = {url,filename};
  await newlisting.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");

}

module.exports.edit = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
}

module.exports.update = async (req, res) => {
  
  const { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if(typeof req.file !== "undefined"){
  let url = req.file.path;
  let filename = req.file.filename;
  listing.image = {url,filename};
  await listing.save();
  }
  res.redirect(`/listings/${id}`);
}

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
}

module.exports.search = async (req, res) => {
  const { q } = req.query;
  if (!q) {
    req.flash("error", "Please enter a search term.");
    return res.redirect("/listings");
  }
  const allListing = await Listing.find({ title: new RegExp(q, "i") });
  if (allListing.length === 0) {
    req.flash("error", `No listings found for "${q}".`);
  }
  res.render("listings/index.ejs", { allListing });
};

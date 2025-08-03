const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const{storage} = require("../cloudConfig.js");
const upload = multer({storage});


router.get("/new", isLoggedIn,listingController.renderNewForm);
router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("listing[image]"),wrapAsync(listingController.submit))

router.get("/search", wrapAsync(listingController.search));

router.route("/:id")
.get(wrapAsync(listingController.show))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),wrapAsync(listingController.update))
.delete(isLoggedIn, isOwner,wrapAsync(listingController.delete));

// GET /listings/new — form to create a new listing


// GET /listings/:id/edit — show edit form
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingController.edit));

router.use((err, req, res, next) => {
  let { status, message } = err;
  res.render("errors.ejs",{err});
})

module.exports = router;

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const path = require("path");
const express = require ("express");
const app = express();

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
    console.log("Connected to MongoDB");
  }
  
  main().catch((err) => console.log(err));

  const initDB = async()=>{

    await Listing.deleteMany({});
   initData.data = initData.data.map((obj=>({...obj,owner:"6884cec5884cd1ea97f9e7f2"})))
    await Listing.insertMany(initData.data);
    console.log("data was initilised");
  };

  initDB();
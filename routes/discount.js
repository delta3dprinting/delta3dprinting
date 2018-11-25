/* ======================================== MODULES ========================================= */

const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

/* ========================================= MODELS ========================================= */

// Discount Model
const Discount = require("../models/Discount");

module.exports = (app, passport, conn) => {
  /* ================================ SET MONGODB CONNECTION ================================ */

  let gfs;

  conn.once("open", () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("fs");
  });
  /* ====================================== DISCOUNTS ======================================= */

  // @route   POST /discounts
  // @desc    Get all Discounts
  // @access  Admin
  app.get("/discounts", adminRestrictedPages, (req, res) => {
    /* ------------------------ ACCESS DISCOUNT TO GET ALL DISCOUNTS ------------------------ */

    Discount.find({}, (err, docs) => {
      if (err) return res.send("error");

      if (!docs) return res.send("no discounts found");

      return res.send(docs);
    });
  });

  /* ===================================== ADD DISCOUNT ===================================== */

  // @route   POST /discount/create
  // @desc    Create a Discount
  // @access  Admin
  app.post("/discount/create", adminRestrictedPages, (req, res) => {
    /* ----------------------------- ASSIGN DISCOUNT ATTRIBUTES ----------------------------- */

    const name = req.body.name;
    const code = req.body.code;
    const rate = req.body.rate;
    const type = req.body.type;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    /* ---------------------------- VALIDATE DISCOUNT ATTRIBUTES ---------------------------- */

    if (
      !discountAttributeValidator(name, code, rate, type, startDate, endDate)
    ) {
      return res.send("failed");
    }

    /* ----------------------------------- SAVE DISCOUNT ------------------------------------ */

    // Create the Discount
    let newDiscount = new Discount();

    newDiscount.name = name;
    newDiscount.code = code;
    newDiscount.rate = rate;
    newDiscount.type = type;
    newDiscount.startDate = startDate;
    newDiscount.endDate = endDate;

    // Save to the Database
    newDiscount.save((err, discount) => {
      if (err) return res.send("failed");

      res.send("success");
    });
  });

  /* =================================== DELETE DISCOUNT ==================================== */

  // @route   POST /discount/delete
  // @desc    Delete a Discount
  // @access  Admin
  app.post("/discount/delete", adminRestrictedPages, (req, res) => {
    const id = mongoose.Types.ObjectId(req.body.id);

    /* -------------------------------- FIND DISCOUNT BY ID --------------------------------- */

    Discount.findByIdAndDelete(id, (err, discount) => {
      if (err) return res.send("failed to fetch a discount");

      if (!discount) return res.send("no discount found");

      return res.send("success");
    });
  });
};

/* ======================================== FUNCTION ======================================== */

/* ------------------------------ DISCOUNT ATTRIBUTE VALIDATOR ------------------------------ */

const discountAttributeValidator = (
  name,
  code,
  rate,
  type,
  startDate,
  endDate
) => {
  let invalid = 0;

  // Validate Discount Name
  if (!name) {
    invalid++;
  }

  // Validate Discount Code
  if (!code) {
    invalid++;
  }

  // Validate Discount Rate
  if (!rate) {
    invalid++;
  }

  // Validate Discount Type
  if (!type) {
    invalid++;
  }

  // Validate Discount Start Date
  if (!startDate) {
    invalid++;
  }

  // Validate Discount End Date
  if (!endDate) {
    invalid++;
  }

  // Return Validation Results
  if (invalid) {
    return false;
  } else {
    return true;
  }
};

/* ======================================= MIDDLEWARE ======================================= */

/* -------------------------------------- ADMIN ACCESS -------------------------------------- */

const adminRestrictedPages = (req, res, next) => {
  if (req.isAuthenticated() && req.user.accountType == "admin") {
    return next();
  } else {
    res.redirect("/");
  }
};

/* ========================================================================================== */

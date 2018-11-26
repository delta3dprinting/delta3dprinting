/* ======================================== MODULES ========================================= */

const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

/* ========================================= MODELS ========================================= */

// Discount Model
const Discount = require("../models/Discount");
// Print Order Model
const PrintOrder = require("../models/PrintOrder");

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
    const minOrderValue = req.body.minOrderValue;
    const maxOrderValue = req.body.maxOrderValue;
    let startDate;
    let endDate;

    // Set Start Date
    if (req.body.startDate === "Invalid Date") {
      startDate = "";
    } else {
      startDate = req.body.startDate;
    }

    // Set End Date
    if (req.body.endDate === "Invalid Date") {
      endDate = "";
    } else {
      endDate = req.body.endDate;
    }

    /* ---------------------------- VALIDATE DISCOUNT ATTRIBUTES ---------------------------- */

    if (
      !discountAttributeValidator(
        name,
        code,
        rate,
        type,
        minOrderValue,
        maxOrderValue,
        startDate,
        endDate
      )
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
    newDiscount.minOrderValue = minOrderValue;
    newDiscount.maxOrderValue = maxOrderValue;
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

  /* ==================================== GET DISCOUNTS ===================================== */

  // @route   POST /discounts/order
  // @desc    Get Discounts
  // @access  Admin
  app.post("/discounts/order", restrictedPages, (req, res) => {
    const user = req.user;
    let discountObjectArray = [];

    if (user.accountType === "normal") {
      discountObjectArray.push(normalDiscount());
    } else if (user.accountType === "partner") {
      if (user.email === "") {
        discountObjectArray.push(gettingLostDiscount(user._id));
      } else {
        discountObjectArray.push(partnerDiscount(user._id));
      }
    } else if (user.accountType === "student") {
      discountObjectArray.push(studentDiscount());
    }

    return res.send(discountObjectArray);
  });
};

/* =================================== OBJECT CONSTRUCTOR =================================== */

/* ------------------------------------ DISCOUNT OBJECT ------------------------------------- */

class DiscountObject {
  constructor(name, code, rate) {
    this.name = name;
    this.code = code;
    this.rate = rate;
    this.minOrderValue = this.minOrderValue;
    this.maxOrderValue = this.maxOrderValue;
    this.startDate = this.startDate;
    this.endDate = this.endDate;
  }
}

/* ======================================== FUNCTION ======================================== */

/* ------------------------------------- GET DISCOUNTS -------------------------------------- */

const getDiscount = code => {
  Discount.findOne({ code }, (err, discount) => {
    if (err) return "error when fetching a discount";

    if (!discount) return "no discount found";

    return new DiscountObject(
      discount.name,
      discount.code,
      discount.rate,
      discount.minOrderValue,
      discount.maxOrderValue,
      discount.startDate,
      discount.endDate
    );
  });
};

/* --------------------------------- PERSONALISED DISCOUNTS --------------------------------- */

const gettingLostDiscount = partnerId => {
  let totalPartnerDiscountRate = 0;
  const discountObjectArray = [...partnerDiscount(partnerId)];
  const customDiscountObjectArray = [getDiscount("40%gettinglostdiscount")];

  discountObjectArray.forEach(discountObject => {
    const rate = Number(discountObject.rate);

    totalPartnerDiscountRate = totalPartnerDiscountRate + rate;
  });

  if (totalPartnerDiscountRate <= 0.4) {
    return customDiscountObjectArray;
  } else if (totalPartnerDiscountRate > 0.4) {
    return discountObjectArray;
  }
};

/* ------------------------------------ NORMAL DISCOUNTS ------------------------------------ */

const normalDiscount = () => {
  let discountObjectArray = [];

  discountObjectArray.push(overHundredDollarDiscount());

  return discountObjectArray;
};

const overHundredDollarDiscount = () => {
  const discountCode = "20%over$100discount";

  return getDiscount(discountCode);
};

/* ----------------------------------- STUDENT DISCOUNTS ------------------------------------ */

const studentDiscount = () => {
  let discountObjectArray = [];

  discountObjectArray.push(studentDefaultDiscount());

  return discountObjectArray;
};

const studentDefaultDiscount = () => {
  const discountCode = "20%studentdiscount";

  return getDiscount(discountCode);
};

/* ----------------------------------- PARTNER DISCOUNTS ------------------------------------ */

const partnerDiscount = partnerId => {
  let discountObjectArray = [];

  discountObjectArray.push(partnerDefaultDiscount());

  const previousMonthCumulativeOrderValue = partnerPreviousMonthCumulativeOrderValue(
    partnerId
  );

  if (previousMonthCumulativeOrderValue >= 2000) {
    discountObjectArray.push(
      partnerMonthlyDiscount(previousMonthCumulativeOrderValue)
    );
  }

  const previousWeekCumulativeOrderValue = partnerPreviousWeekCumulativeOrderValue(
    partnerId
  );

  if (previousWeekCumulativeOrderValue >= 1000) {
    discountObjectArray.push(
      partnerWeeklyDiscount(previousWeekCumulativeOrderValue)
    );
  }

  return discountObjectArray;
};

const partnerDefaultDiscount = () => {
  const discountCode = "15%partnerdiscount";

  return getDiscount(discountCode);
};

const partnerMonthlyDiscount = previousMonthCumulativeOrderValue => {
  let discountCode;

  if (
    previousMonthCumulativeOrderValue >= 2000 &&
    previousMonthCumulativeOrderValue < 3000
  ) {
    discountCode = "5%partnermonthlydiscount";
  } else if (
    previousMonthCumulativeOrderValue >= 3000 &&
    previousMonthCumulativeOrderValue < 4000
  ) {
    discountCode = "10%partnermonthlydiscount";
  } else if (
    previousMonthCumulativeOrderValue >= 4000 &&
    previousMonthCumulativeOrderValue < 5000
  ) {
    discountCode = "15%partnermonthlydiscount";
  } else if (previousMonthCumulativeOrderValue >= 5000) {
    discountCode = "20%partnermonthlydiscount";
  }

  return getDiscount(discountCode);
};

const partnerPreviousMonthCumulativeOrderValue = partnerId => {
  return 2500;
};

const partnerWeeklyDiscount = previousWeekCumulativeOrderValue => {
  let discountCode;

  if (
    previousWeekCumulativeOrderValue >= 1000 &&
    previousWeekCumulativeOrderValue < 2000
  ) {
    discountCode = "7.5%partnerweeklydiscount";
  } else if (previousWeekCumulativeOrderValue >= 2000) {
    discountCode = "15%partnerweeklydiscount";
  }

  return getDiscount(discountCode);
};

const partnerPreviousWeekCumulativeOrderValue = partnerId => {
  return 1500;
};

/* -------------------------------- EVENT/HOLIDAY DISCOUNTS --------------------------------- */

/* ------------------------------ DISCOUNT ATTRIBUTE VALIDATOR ------------------------------ */

const discountAttributeValidator = (
  name,
  code,
  rate,
  type,
  minOrderValue,
  maxOrderValue,
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

  // Validate Discount Min Order Value
  if (!minOrderValue) {
    invalid++;
  }

  // Validate Discount Max Order Value
  if (!maxOrderValue) {
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

/* ------------------------------------- GENERAL ACCESS ------------------------------------- */

const restrictedPages = (req, res, next) => {
  // If user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  } else {
    // If they aren't redirect them to the homepage
    res.redirect("/");
  }
};

/* -------------------------------------- ADMIN ACCESS -------------------------------------- */

const adminRestrictedPages = (req, res, next) => {
  if (req.isAuthenticated() && req.user.accountType == "admin") {
    return next();
  } else {
    res.redirect("/");
  }
};

/* ========================================================================================== */

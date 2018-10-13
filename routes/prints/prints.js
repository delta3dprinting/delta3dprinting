const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

module.exports = (app, passport, upload, conn) => {
  let gfs;

  conn.once("open", () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("fs");
  });

  // @route   POST /new_order
  // @desc    Create a New Order and Store Order Details and File
  // @access  Private
  app.post(
    "/new_order",
    upload.single("order_new_print_3d_model"),
    restrictedPages,
    (req, res) => {
      console.log("Received");

      // Create the New Order Properties Object
      const orderOptionsObject = {
        ownerId: req.user._id,
        orderStatus: req.body.orderStatus,
        orderType: req.body.type,
        materialGroup: req.body.materialGroup,
        process: req.body.process,
        material: req.body.material,
        quality: req.body.quality,
        strength: req.body.strength,
        color: req.body.color
      };

      // Update the Metadata object with the New Order Properties
      gfs.files.findOneAndUpdate(
        { filename: req.file.filename },
        { $set: { metadata: orderOptionsObject } },
        (err, doc) => {
          if (err) return console.log("Error");
          res.send("Success!");
        }
      );
    }
  );

  // @route   GET /orders
  // @desc    Fetch The Orders in a form of Object based on User
  // @access  Private
  app.get("/orders", (req, res) => {
    class OrderObject {
      constructor(
        orderId,
        filename,
        orderStatus,
        materialGroup,
        process,
        material,
        quality,
        strength,
        color
      ) {
        this.orderId = orderId;
        this.filename = filename;
        this.orderStatus = orderStatus;
        this.materialGroup = materialGroup;
        this.process = process;
        this.material = material;
        this.quality = quality;
        this.strength = strength;
        this.color = color;
      }
    }
    const ordersObjectArray = [];
    const testObject = gfs.files.find({ "metadata.ownerId": req.user._id });

    testObject
      .forEach((doc, err) => {
        ordersObjectArray.push(
          new OrderObject(
            doc._id,
            doc.filename,
            doc.metadata.orderStatus,
            doc.metadata.materialGroup,
            doc.metadata.process,
            doc.metadata.material,
            doc.metadata.quality,
            doc.metadata.strength,
            doc.metadata.color
          )
        );
      })
      .then(() => {
        res.send(ordersObjectArray);
      });
  });

  // @route   GET /orders/:filename
  // @desc    Download the STL File
  // @access  Private
  app.get("/orders/:filename", (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "No file exists"
        });
      }
      // File exists
      const readstream = gfs.createReadStream(file.filename);
      res.setHeader(
        "Content-disposition",
        "attachment; filename=" + req.params.filename
      );
      res.setHeader("Content-type", "application/octet-stream");
      readstream.pipe(res);
    });
  });
};

// Route middleware to make sure a user is logged in
const restrictedPages = (req, res, next) => {
  // If user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    loginStatus = true;
    return next();
  } else {
    loginStatus = false;
    // If they aren't redirect them to the homepage
    res.redirect("/");
  }
};
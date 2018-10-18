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
        orderedQuantity: req.body.orderedQuantity,
        producedQuantity: req.body.producedQuantity,
        quality: req.body.quality,
        strength: req.body.strength,
        color: req.body.color,
        pricing: req.body.pricing,
        delivery: req.body.delivery
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
        orderedQuantity,
        producedQuantity,
        quality,
        strength,
        color,
        pricing,
        delivery
      ) {
        this.orderId = orderId;
        this.filename = filename;
        this.orderStatus = orderStatus;
        this.materialGroup = materialGroup;
        this.process = process;
        this.material = material;
        this.orderedQuantity = orderedQuantity;
        this.producedQuantity = producedQuantity;
        this.quality = quality;
        this.strength = strength;
        this.color = color;
        this.pricing = pricing;
        this.delivery = delivery;
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
            doc.metadata.orderedQuantity,
            doc.metadata.producedQuantity,
            doc.metadata.quality,
            doc.metadata.strength,
            doc.metadata.color,
            doc.metadata.pricing,
            doc.metadata.delivery
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

  // @route   POST /orderNewPrint/saveFile
  // @desc
  // @access  Private
  app.post(
    "/orderNewPrint/saveFile",
    upload.single("uploadModel"),
    restrictedPages,
    (req, res) => {
      // Create the New Order Properties Object
      const fileAdditionalInfo = {
        ownerId: req.user._id,
        fileType: "Order New Print"
      };

      // Update the Metadata object with the New Order Properties
      gfs.files.findOneAndUpdate(
        { filename: req.file.filename },
        { $set: { metadata: fileAdditionalInfo } },
        (err, doc) => {
          if (err) return console.log(err);
          console.log(doc.value._id);
          res.send(doc);
        }
      );
    }
  );
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

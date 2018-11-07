const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

// Load PrintOrder Model
const PrintOrder = require("../../models/PrintOrder");
// Load User Profile Model
const UserProfile = require("../../models/UserProfile");

module.exports = (app, passport, upload, conn) => {
  let gfs;

  conn.once("open", () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("fs");
  });

  /* ======================================== FOR TESTING ========================================= */

  // @route   GET /test/payment-confirmation-date
  // @desc    Set the Order's Payment Confirmation Date for Testing
  // @access  Private
  app.post("/test/payment-confirmation-date", restrictedPages, (req, res) => {
    PrintOrder.findOneAndUpdate(
      {
        orderNumber: req.body.orderNumber
      },
      { $set: { paymentConfirmationDate: new Date() } },
      (err, order) => {
        if (err) return res.send("failed");

        res.send("success");
      }
    );
  });

  // @route   GET /test/order-delivery-date
  // @desc    Set the Order's Delivery Date for Testing
  // @access  Private
  app.post("/test/order-delivery-date", restrictedPages, (req, res) => {
    PrintOrder.findOneAndUpdate(
      {
        orderNumber: req.body.orderNumber
      },
      { $set: { orderDeliveryDate: new Date() } },
      (err, order) => {
        if (err) return res.send("failed");

        res.send("success");
      }
    );
  });

  // @route   GET /test/order-completion-date
  // @desc    Set the Order's Completion Date for Testing
  // @access  Private
  app.post("/test/order-completion-date", restrictedPages, (req, res) => {
    PrintOrder.findOneAndUpdate(
      {
        orderNumber: req.body.orderNumber
      },
      { $set: { orderCompletionDate: new Date() } },
      (err, order) => {
        if (err) return res.send("failed");

        res.send("success");
      }
    );
  });

  /* =============================== 3D PRINT ORDERS RELATED ROUTES =============================== */

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
        fileType: "Order New Print",
        price: "pending",
        uploadDate: new Date(),
        lastUsed: new Date()
      };

      // Update the Metadata object with the New Order Properties
      gfs.files.findOneAndUpdate(
        { _id: req.file.id },
        { $set: { metadata: fileAdditionalInfo } },
        (err, doc) => {
          if (err) return console.log(err);
          res.send(doc.value._id);
        }
      );
    }
  );

  // @route   POST /orderNewPrint/createNewOrder
  // @desc
  // @access  Private
  app.post("/orderNewPrint/createNewOrder", restrictedPages, (req, res) => {
    const orderNewPrint = new PrintOrder();

    PrintOrder.countDocuments((err, count) => {
      if (err) return console.log(err);

      orderNewPrint.orderNumber = count + 1;

      // Set Variables
      orderNewPrint.ownerId = req.user._id;
      orderNewPrint.creationDate = new Date();
      orderNewPrint.orderStatus = "Awaiting Quote";
      orderNewPrint.lastUpdateDate = new Date();
      orderNewPrint.paymentConfirmationDate = "";
      orderNewPrint.orderDeliveryDate = "";
      orderNewPrint.pickupBookingSchedule = {};
      for (i = 0; i < req.body.partObjectArray.length; i++) {
        orderNewPrint.parts[i] = {
          fileId: req.body.partObjectArray[i].fileId,
          fileName: req.body.partObjectArray[i].fileName,
          materialGroup: req.body.partObjectArray[i].materialGroup,
          process: req.body.partObjectArray[i].process,
          material: req.body.partObjectArray[i].material,
          orderQuantity: req.body.partObjectArray[i].orderQuantity,
          producedQuantity: req.body.partObjectArray[i].producedQuantity,
          quality: req.body.partObjectArray[i].quality,
          strength: req.body.partObjectArray[i].strength,
          color: req.body.partObjectArray[i].color
        };
      }
      orderNewPrint.comments = [];
      orderNewPrint.pricing = req.body.pricing;
      orderNewPrint.delivery = req.body.delivery;
      orderNewPrint.ownerNote = req.body.additionalNote;
      orderNewPrint.attachments = [];

      orderNewPrint.save();

      res.send("Success");
    });
  });

  // @route   GET /orders
  // @desc    Fetch The Orders in a form of Object based on User
  // @access  Private
  app.get("/orders", restrictedPages, (req, res) => {
    PrintOrder.find({ ownerId: req.user._id }, (err, docs) => {
      res.send(docs);
    });
  });

  // @route   GET /order
  // @desc    Fetch an order based on order number
  // @access  Private
  app.post("/order", restrictedPages, (req, res) => {
    PrintOrder.findOne(
      { ownerId: req.user._id, orderNumber: req.body.orderNumber },
      (err, docs) => {
        res.send(docs);
      }
    );
  });

  // @route   POST /order/comment
  // @desc    Fetch an order based on order number
  // @access  Private
  app.post("/Profile/order-comment", restrictedPages, (req, res) => {
    PrintOrder.findOne({
      ownerId: req.body.order.ownerId,
      orderNumber: req.body.order.orderNumber
    }).then(order => {
      const newComment = {
        userId: req.user._id,
        text: req.body.comment,
        createdDate: new Date()
      };

      order.comments.push(newComment);
      order.lastUpdateDate = new Date();

      order.save().then(order => {
        res.send({
          orderOwnerId: order.ownerId,
          orderOrderNumber: order.orderNumber
        });
      });
    });
  });

  // @route   POST /order/comments
  // @desc    Fetch an order based on order number
  // @access  Private
  app.post("/Profile/order-comments", restrictedPages, (req, res) => {
    class CommentsDetailObject {
      constructor(userName, comment, dateCreated, ownership) {
        this.userName = userName;
        this.comment = comment;
        this.dateCreated = dateCreated;
        this.ownership = ownership;
      }
    }

    let commentsDetailObjectArray = [];

    PrintOrder.findOne(
      {
        ownerId: req.body.ownerId,
        orderNumber: req.body.orderNumber
      },
      (err, order) => {
        if (err) throw err;

        if (order.comments.length == 0) {
          return res.send(commentsDetailObjectArray);
        }

        for (i = 0; i < order.comments.length; i++) {
          const userId = order.comments[i].userId;
          let userName;
          const comment = order.comments[i].text;
          const dateCreated = order.comments[i].createdDate;
          let ownership;

          UserProfile.findOne(
            {
              ownerId: userId
            },
            (err, profile) => {
              if (err) throw err;

              userName = profile.firstName;

              const userId = req.user._id + "";
              const commentOwnerId = profile.ownerId + "";

              if (userId === commentOwnerId) {
                ownership = true;
              } else {
                ownership = false;
              }
              commentsDetailObjectArray.push(
                new CommentsDetailObject(
                  userName,
                  comment,
                  dateCreated,
                  ownership
                )
              );

              if (commentsDetailObjectArray.length == order.comments.length) {
                res.send(commentsDetailObjectArray);
              }
            }
          );
        }
      }
    );
  });

  // @route   POST /order/price
  // @desc    Fetch an order based on order number
  // @access  Private
  app.post("/order/price", restrictedPages, (req, res) => {
    const id = mongoose.Types.ObjectId(req.body.fileId);

    gfs.files.findOne({ _id: id }, (err, file) => {
      if (err) return console.log("Error");

      res.send(file.metadata.price);
    });
  });

  /* ==================================== BOOK A PICKUP TIME ==================================== */

  app.post("/order/book-pickup", restrictedPages, (req, res) => {
    console.log(req.body.bookingFormInputsObject);
    PrintOrder.findOneAndUpdate(
      {
        ownerId: req.user._id,
        orderNumber: req.body.orderNumber
      },
      {
        $set: {
          pickupBookingSchedule: req.body.bookingFormInputsObject,
          lastUpdateDate: new Date()
        }
      },
      (err, order) => {
        if (err) {
          return res.send("Booking Failed");
        }
        res.send("Booking Success");
      }
    );
  });

  /* =================================== UPDATE ORDER STATUS ==================================== */

  // @route   POST /order/update-order-status
  // @desc    Update Order Status
  // @access  Private
  app.post("/order/update-order-status", restrictedPages, (req, res) => {
    if (req.body.orderStatus == "Awaiting Quote") {
    } else if (req.body.orderStatus == "Awaiting Payment") {
      updateOrderStatusAwaitingPayment(req, res);
    } else if (req.body.orderStatus == "Awaiting Payment Confirmation") {
    } else if (req.body.orderStatus == "Printing Order") {
    } else if (req.body.orderStatus == "Ready for Pickup") {
      updateOrderStatusReadyForPickup(req, res);
    } else if (req.body.orderStatus == "Order Picked Up") {
      updateOrderStatusOrderPickedUp(req, res);
    } else if (req.body.orderStatus == "Ready for Shipping") {
    } else if (req.body.orderStatus == "Order Shipped") {
      updateOrderStatusOrderShipped(req, res);
    } else if (req.body.orderStatus == "Order Completed") {
    } else {
      console.log("Order status could not be identified");
      res.send("failed");
    }
  });
};

/* ========================================== FUNCTION ========================================== */

/* --------------------------- UPDATE ORDER STATUS: AWAITING PAYMENT ---------------------------- */

const updateOrderStatusAwaitingPayment = (req, res) => {
  const order = req.body;

  PrintOrder.findOneAndUpdate(
    { _id: order._id, orderNumber: order.orderNumber, ownerId: req.user._id },
    {
      $set: {
        orderStatus: "Awaiting Payment Confirmation",
        lastUpdateDate: new Date()
      }
    },
    (err, order) => {
      if (err) throw err;

      const orderNumber = order.orderNumber + "";

      res.send(orderNumber);
    }
  );
};

/* --------------------------- UPDATE ORDER STATUS: READY FOR PICKUP ---------------------------- */

const updateOrderStatusReadyForPickup = (req, res) => {
  const order = req.body;

  PrintOrder.findOneAndUpdate(
    { _id: order._id, orderNumber: order.orderNumber, ownerId: req.user._id },
    {
      $set: {
        orderStatus: "Order Picked Up",
        orderDeliveryDate: new Date(),
        lastUpdateDate: new Date()
      }
    },
    (err, order) => {
      if (err) throw err;

      const orderNumber = order.orderNumber + "";

      res.send(orderNumber);
    }
  );
};

/* ---------------------------- UPDATE ORDER STATUS: ORDER PICKED UP ---------------------------- */

const updateOrderStatusOrderPickedUp = (req, res) => {
  const order = req.body;

  PrintOrder.findOneAndUpdate(
    { _id: order._id, orderNumber: order.orderNumber, ownerId: req.user._id },
    {
      $set: {
        orderStatus: "Order Completed",
        orderCompletionDate: new Date(),
        lastUpdateDate: new Date()
      }
    },
    (err, order) => {
      if (err) throw err;

      const orderNumber = order.orderNumber + "";

      res.send(orderNumber);
    }
  );
};

/* --------------------------- UPDATE ORDER STATUS: ORDER SHIPPED UP ---------------------------- */

const updateOrderStatusOrderShipped = (req, res) => {
  const order = req.body;

  PrintOrder.findOneAndUpdate(
    { _id: order._id, orderNumber: order.orderNumber, ownerId: req.user._id },
    {
      $set: {
        orderStatus: "Order Completed",
        orderCompletionDate: new Date(),
        lastUpdateDate: new Date()
      }
    },
    (err, order) => {
      if (err) throw err;

      const orderNumber = order.orderNumber + "";

      res.send(orderNumber);
    }
  );
};

/* ========================================= MIDDLEWARE ========================================= */

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

/* ============================================================================================== */

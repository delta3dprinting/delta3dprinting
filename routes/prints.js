const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

// Load PrintOrder Model
const PrintOrder = require("../models/PrintOrder");
// Load User Profile Model
const UserProfile = require("../models/UserProfile");

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
  app.get("/orders/:fileId", (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.fileId);
    gfs.files.findOne({ _id: id }, (err, file) => {
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
        "attachment; filename=" + file.filename
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

  /* ==================================== ADMIN: ORDER LIST ===================================== */

  // @route   POST /admin/order
  // @desc
  // @access  Admin
  app.post("/admin/order", adminRestrictedPages, (req, res) => {
    PrintOrder.findOne({ orderNumber: req.body.orderNumber }, (err, order) => {
      if (err) throw err;

      res.send(order);
    });
  });

  // @route   GET /admin/orders/awaiting-quote
  // @desc
  // @access  Admin
  app.get("/admin/orders/awaiting-quote", adminRestrictedPages, (req, res) => {
    PrintOrder.find({ orderStatus: "Awaiting Quote" }, (err, orders) => {
      if (err) throw err;

      res.send(orders);
    });
  });

  // @route   GET /admin/orders/awaiting-payment-confirmation
  // @desc
  // @access  Admin
  app.get(
    "/admin/orders/awaiting-payment-confirmation",
    adminRestrictedPages,
    (req, res) => {
      PrintOrder.find(
        { orderStatus: "Awaiting Payment Confirmation" },
        (err, orders) => {
          if (err) throw err;

          res.send(orders);
        }
      );
    }
  );

  // @route   GET /admin/orders/printing-order
  // @desc
  // @access  Admin
  app.get("/admin/orders/printing-order", adminRestrictedPages, (req, res) => {
    PrintOrder.find({ orderStatus: "Printing Order" }, (err, orders) => {
      if (err) throw err;

      res.send(orders);
    });
  });

  // @route   GET /admin/orders/ready-for-pickup
  // @desc
  // @access  Admin
  app.get(
    "/admin/orders/ready-for-pickup",
    adminRestrictedPages,
    (req, res) => {
      PrintOrder.find({ orderStatus: "Ready for Pickup" }, (err, orders) => {
        if (err) throw err;

        res.send(orders);
      });
    }
  );

  // @route   GET /admin/orders/ready-for-shipping
  // @desc
  // @access  Admin
  app.get(
    "/admin/orders/ready-for-shipping",
    adminRestrictedPages,
    (req, res) => {
      PrintOrder.find({ orderStatus: "Ready for Shipping" }, (err, orders) => {
        if (err) throw err;

        res.send(orders);
      });
    }
  );

  // @route   GET /admin/orders
  // @desc
  // @access  Admin
  app.get("/admin/orders", adminRestrictedPages, (req, res) => {
    PrintOrder.find((err, orders) => {
      if (err) throw err;

      res.send(orders);
    });
  });

  // @route   POST /admin/file-details
  // @desc    Get File Details
  // @access  Admin
  app.post("/admin/file-details", adminRestrictedPages, (req, res) => {
    const id = mongoose.Types.ObjectId(req.body.fileId);

    gfs.files.findOne({ _id: id }, (err, file) => {
      if (err) throw err;

      if (!file) return res.send("No File Found");

      res.send(file);
    });
  });

  // @route   POST /admin/part/set-price
  // @desc    Set Part's Price
  // @access  Admin
  app.post("/admin/part/set-price", adminRestrictedPages, (req, res) => {
    const id = mongoose.Types.ObjectId(req.body.fileId);

    gfs.files.findOneAndUpdate(
      { _id: id },
      { $set: { "metadata.price": req.body.partPrice } },
      (err, doc) => {
        if (err) throw err;

        res.send(doc);
      }
    );
  });

  // @route   POST /admin/part/update-produced-quantity
  // @desc    Update Produced Quantity
  // @access  Admin
  app.post(
    "/admin/part/update-produced-quantity",
    adminRestrictedPages,
    (req, res) => {
      const producedQuantity = req.body.producedQuantity;
      const orderId = req.body.orderId;
      const partId = req.body.partId;

      const findPartIndex = element => {
        return element._id == partId;
      };

      PrintOrder.findById(orderId, (err, order) => {
        if (err) {
          console.log(err);
          res.send("failed");
          return;
        }

        if (!order) {
          console.log("No order found");
          res.send("failed");
          return;
        }

        const partIndex = order.parts.findIndex(findPartIndex);

        order.parts[partIndex].producedQuantity = producedQuantity;

        order.save((err, order) => {
          if (err) {
            console.log("Failed to Save");
            res.send("failed");
            return;
          }
          res.send(order);
        });
      });
    }
  );

  // @route   POST /admin/order/update-tracking-number
  // @desc    Update Tracking Number
  // @access  Admin
  app.post(
    "/admin/order/update-tracking-number",
    adminRestrictedPages,
    (req, res) => {
      const id = mongoose.Types.ObjectId(req.body.orderId);

      PrintOrder.findByIdAndUpdate(
        id,
        {
          $set: { trackingNumber: req.body.trackingNumber }
        },
        (err, order) => {
          if (err) {
            console.log("Error found");
            res.send("failed");
            return;
          }

          if (!order) {
            console.log("No order found");
            res.send("failed");
            return;
          }

          console.log(order);
          res.send("success");
        }
      );
    }
  );

  // @route   POST /admin/order/update-order-status
  // @desc    Update Order Status
  // @access  Private
  app.post(
    "/admin/order/update-order-status",
    adminRestrictedPages,
    (req, res) => {
      if (req.body.orderStatus == "Awaiting Quote") {
        updateOrderStatusAwaitingQuote(req, res);
      } else if (req.body.orderStatus == "Awaiting Payment") {
        updateOrderStatusAwaitingPayment(req, res);
      } else if (req.body.orderStatus == "Awaiting Payment Confirmation") {
        updateOrderStatusAwaitingPaymentConfirmation(req, res);
      } else if (req.body.orderStatus == "Printing Order") {
        updateOrderStatusPrintingOrder(req, res);
      } else if (req.body.orderStatus == "Ready for Pickup") {
        updateOrderStatusReadyForPickup(req, res);
      } else if (req.body.orderStatus == "Order Picked Up") {
        updateOrderStatusOrderPickedUp(req, res);
      } else if (req.body.orderStatus == "Ready for Shipping") {
        updateOrderStatusReadyForShipping(req, res);
      } else if (req.body.orderStatus == "Order Shipped") {
        updateOrderStatusOrderShipped(req, res);
      } else {
        console.log("Order status could not be identified");
        res.send("failed");
      }
    }
  );

  // @route   POST /order/owner-details
  // @desc    Fetch Order's Owner Details
  // @access  Private
  app.post("/order/owner-details", restrictedPages, (req, res) => {
    const order = req.body;
    const id = mongoose.Types.ObjectId(order.ownerId);

    if (req.user.accountType != "admin") {
      if (req.user._id != id) {
        console.log("Incorrect User");
        return res.send("failed");
      }
    }

    UserProfile.findOne({ ownerId: id }, (err, user) => {
      if (err) throw err;

      if (!user) {
        console.log("No User Found");
        res.send("failed");
        return;
      }

      res.send(user);
    });
  });

  // @route   POST /order/part/file-details
  // @desc    Fetch File Details
  // @access  Private
  app.post("/order/part/file-details", restrictedPages, (req, res) => {
    const part = req.body;
    const id = mongoose.Types.ObjectId(part.fileId);

    gfs.files.findOne({ _id: id }, (err, file) => {
      if (err) throw err;

      if (!file) {
        console.log("No User Found");
        res.send("failed");
        return;
      }

      res.send(file);
    });
  });
};

/* ========================================== FUNCTION ========================================== */

/* ---------------------------- UPDATE ORDER STATUS: AWAITING QUOTE ----------------------------- */

const updateOrderStatusAwaitingQuote = (req, res) => {
  const order = req.body;

  PrintOrder.findOneAndUpdate(
    { _id: order._id, orderNumber: order.orderNumber },
    {
      $set: {
        orderStatus: "Awaiting Payment",
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

/* --------------------------- UPDATE ORDER STATUS: AWAITING PAYMENT ---------------------------- */

const updateOrderStatusAwaitingPayment = (req, res) => {
  const order = req.body;
  let query;
  if (req.user.accountType == "admin") {
    query = { _id: order._id, orderNumber: order.orderNumber };
  } else {
    query = {
      _id: order._id,
      orderNumber: order.orderNumber,
      ownerId: req.user._id
    };
  }

  PrintOrder.findOneAndUpdate(
    query,
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

/* ------------------------------- AWAITING PAYMENT CONFIRMATION -------------------------------- */

const updateOrderStatusAwaitingPaymentConfirmation = (req, res) => {
  const order = req.body;
  let query;
  if (req.user.accountType == "admin") {
    query = { _id: order._id, orderNumber: order.orderNumber };
  } else {
    query = {
      _id: order._id,
      orderNumber: order.orderNumber,
      ownerId: req.user._id
    };
  }

  PrintOrder.findOneAndUpdate(
    query,
    {
      $set: {
        orderStatus: "Printing Order",
        paymentConfirmationDate: new Date(),
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

/* ---------------------------- UPDATE ORDER STATUS: PRINTING ORDER ----------------------------- */

const updateOrderStatusPrintingOrder = (req, res) => {
  const order = req.body;
  let orderStatus;

  if (order.delivery == "Pickup") {
    orderStatus = "Ready for Pickup";
  } else {
    orderStatus = "Ready for Shipping";
  }

  PrintOrder.findByIdAndUpdate(
    order._id,
    {
      $set: {
        orderStatus: orderStatus,
        lastUpdateDate: new Date()
      }
    },
    (err, order) => {
      if (err) {
        console.log("Failed to update order");
        res.send("failed");
        return;
      }

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

/* -------------------------- UPDATE ORDER STATUS: READY FOR SHIPPING --------------------------- */

const updateOrderStatusReadyForShipping = (req, res) => {
  const order = req.body;

  PrintOrder.findByIdAndUpdate(
    order._id,
    {
      $set: {
        orderStatus: "Order Shipped",
        orderDeliveryDate: new Date(),
        lastUpdateDate: new Date()
      }
    },
    (err, order) => {
      if (err) {
        console.log("Failed to update order");
        res.send("failed");
        return;
      }

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

const adminRestrictedPages = (req, res, next) => {
  if (req.isAuthenticated() && req.user.accountType == "admin") {
    return next();
  } else {
    res.redirect("/");
  }
};

/* ============================================================================================== */

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

  /* ================================ GET ORDER DETAILS ARRAY ================================= */

  // @route   POST /order/get-order-details-array
  // @desc    Get an array of order details
  // @access  Private
  app.post("/order/get-order-details-array", restrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
    const ownerId = req.user._id;
    /* -------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE --------------------- */
    let query;
    if (req.user.accountType == "admin") {
      // ADMIN ACCESS
      query = {};
    } else {
      // USER ACCESS
      query = { ownerId };
    }
    /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
    PrintOrder.getOrderDetailsArray(res, query);
  });

  /* ======================== GET ORDER DETAILS ARRAY BY ORDER STATUS ========================= */

  // @route   POST /order/get-order-details-array-by-order-status
  // @desc    Get an array of order details with the provided order status
  // @access  Private
  app.post(
    "/order/get-order-details-array-by-order-status",
    restrictedPages,
    (req, res) => {
      /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
      const orderStatus = req.body.orderStatus;
      const ownerId = req.user._id;
      /* -------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE --------------------- */
      let query;
      if (req.user.accountType == "admin") {
        // ADMIN ACCESS
        query = { orderStatus };
      } else {
        // USER ACCESS
        query = { orderStatus, ownerId };
      }
      /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
      PrintOrder.getOrderDetailsArray(res, query);
    }
  );

  /* =========================== GET ORDER DETAILS BY ORDER NUMBER ============================ */

  // @route   POST /order/get-order-details-by-order-number
  // @desc    Get an order details based on the provided order number
  // @access  Private
  app.post(
    "/order/get-order-details-by-order-number",
    restrictedPages,
    (req, res) => {
      /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
      const orderNumber = req.body.orderNumber;
      const ownerId = req.user._id;
      /* -------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE --------------------- */
      let query;
      if (req.user.accountType == "admin") {
        // ADMIN ACCESS
        query = { orderNumber };
      } else {
        // USER ACCESS
        query = { orderNumber, ownerId };
      }
      /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
      PrintOrder.getOrderDetails(res, query);
    }
  );

  /* ==================================== CHECK OWNERSHIP ===================================== */

  // @route   POST /order/check-ownership
  // @desc    Check if User is the Owner of the Order
  // @access  Private
  app.post("/order/check-ownership", restrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
    const orderNumber = req.body.orderNumber;
    const userId = req.user._id + "";
    /* -------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE --------------------- */
    const query = { orderNumber };
    /* ----------------------------- SET DUMMY FILTER VARIABLE ------------------------------ */
    const filter = undefined;
    /* --------------------- SET METHOD FOR VALIDATING ORDER OWNERSHIP ---------------------- */
    // Object
    const object = { userId };
    // Method
    const method = (orderDetails, object) => {
      const userId = object.userId;
      const ownerId = orderDetails.ownerId;

      if (ownerId === userId) {
        console.log("success");
        return res.send("true");
      } else {
        console.log("not owner");
        return res.send("failed");
      }
    };
    /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
    PrintOrder.getOrderDetails(res, query, filter, method, object);
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
    console.log(req.body);

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
      orderNewPrint.discounts = req.body.discountObjectArray;
      orderNewPrint.comments = [];
      orderNewPrint.pricing = req.body.pricing;
      orderNewPrint.delivery = req.body.delivery;
      orderNewPrint.ownerNote = req.body.additionalNote;
      orderNewPrint.attachments = [];

      orderNewPrint.save();

      res.send("Success");
    });
  });

  /* ~~~~~~~~~~~~~~~~~~~~~ REPEATED: GET ORDER DETAILS BY ORDER NUMBER ~~~~~~~~~~~~~~~~~~~~~~ */

  // @route   GET /order
  // @desc    Fetch an order based on order number
  // @access  Private
  app.post("/order", restrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
    const orderNumber = req.body.orderNumber;
    const ownerId = req.user._id;
    /* -------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE --------------------- */
    let query;
    if (req.user.accountType == "admin") {
      // ADMIN ACCESS
      query = { orderNumber };
    } else {
      // USER ACCESS
      query = { orderNumber, ownerId };
    }
    /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
    PrintOrder.getOrderDetails(res, query);
  });

  // @route   POST /order/comment
  // @desc    Fetch an order based on order number
  // @access  Private
  app.post("/Profile/order-comment", restrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
    const orderNumber = req.body.order.orderNumber;
    const ownerId = req.body.order.ownerId;
    const userId = req.user._id;
    const comment = req.body.comment;
    /* ------------------------------------- SET QUERY -------------------------------------- */
    const query = { ownerId, orderNumber };
    /* --------------------------------- SET UPDATE METHOD ---------------------------------- */
    const updateMethod = (orderDetails, updateObject) => {
      const newComment = {
        userId: updateObject.userId,
        text: updateObject.comment,
        createdDate: new Date()
      };

      orderDetails.comments.push(newComment);
      orderDetails.lastUpdateDate = new Date();

      orderDetails.save().then(orderDetails => {
        return res.send({
          orderOwnerId: orderDetails.ownerId,
          orderOrderNumber: orderDetails.orderNumber
        });
      });
    };
    /* --------------------------------- SET UPDATE OBJECT ---------------------------------- */
    const updateObject = { userId, comment };
    /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
    PrintOrder.updateOrderDetails(res, query, updateMethod, updateObject);
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

  /* ================================== BOOK A PICKUP TIME ================================== */

  app.post("/order/book-pickup", restrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
    const orderNumber = req.body.orderNumber;
    const ownerId = req.user._id;
    const pickupBookingSchedule = req.body.bookingFormInputsObject;
    const lastUpdateDate = new Date();
    /* -------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE --------------------- */
    let query = { orderNumber, ownerId };
    /* --------------------------------- SET UPDATE OBJECT ---------------------------------- */
    const updateObject = { pickupBookingSchedule, lastUpdateDate };
    /* -------------------------------- SET DUMMY VARIABLES --------------------------------- */
    const updateMethod = undefined;
    /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
    PrintOrder.updateOrderDetails(res, query, updateMethod, updateObject);
  });

  /* ================================= UPDATE ORDER STATUS ================================== */

  // @route   POST /order/update-order-status
  // @desc    Update Order Status
  // @access  Private
  app.post("/order/update-order-status", restrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
    const orderDetails = req.body.orderDetails;
    const orderNumber = orderDetails.orderNumber;
    const ownerId = req.user._id;
    const accountType = req.user.accountType;
    /* -------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE --------------------- */
    let query;
    if (accountType == "admin") {
      // ADMIN ACCESS
      query = { orderNumber };
    } else {
      // USER ACCESS
      query = { orderNumber, ownerId };
    }
    /* --------------------------------- SET UPDATE OBJECT ---------------------------------- */
    const updateObject = setUpdateOrderStatusUpdateObject(
      orderDetails,
      accountType
    );
    /* -------------------------------- SET DUMMY VARIABLES --------------------------------- */
    const updateMethod = undefined;
    /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
    PrintOrder.updateOrderDetails(res, query, updateMethod, updateObject);
  });

  /* ======================================== REFUND ======================================== */

  // @route   POST /order/request-refund
  // @desc    Request Refund
  // @access  Private
  app.post("/order/request-refund", restrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
    // Query
    const orderNumber = req.body.orderNumber;
    const ownerId = req.user._id;
    // Update
    const requestRefundInformation = req.body.refundRequestInformation;
    const orderStatus = "Requesting Refund";
    /* ------------------------------------- SET QUERY -------------------------------------- */
    const query = { orderNumber, ownerId };
    /* --------------------------------- SET UPDATE METHOD ---------------------------------- */
    const updateMethod = (orderDetails, updateObject) => {
      const oldOrderStatus = orderDetails.orderStatus;

      orderDetails.orderStatus = updateObject.orderStatus;
      orderDetails.requestRefundInformation =
        updateObject.requestRefundInformation;
      orderDetails.requestRefundInformation.oldOrderStatus = oldOrderStatus;
      orderDetails.lastUpdateDate = new Date();

      orderDetails.save((error, updateOrderDetails) => {
        // Check if error occured while saving new print order
        if (error) {
          return res.send({
            status: "failed",
            content: "500: Error Found when Saving New Updates of Order Details"
          });
        }

        const orderNumber = updateOrderDetails.orderNumber + "";

        res.send(orderNumber);
      });
    };
    /* --------------------------------- SET UPDATE OBJECT ---------------------------------- */
    const updateObject = { requestRefundInformation, orderStatus };
    /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
    PrintOrder.updateOrderDetails(res, query, updateMethod, updateObject);
  });

  // @route   POST /order/cancel-refund
  // @desc    Cancel Refund
  // @access  Private
  app.post("/order/cancel-refund", restrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
    const orderNumber = req.body.orderNumber;
    const ownerId = req.user._id;
    /* -------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE --------------------- */
    let query;
    if (req.user.accountType == "admin") {
      // ADMIN ACCESS
      query = { orderNumber };
    } else {
      // USER ACCESS
      query = { orderNumber, ownerId };
    }

    PrintOrder.findOne(query, (error, orderDetails) => {
      if (error) {
        return res.send({
          status: "failed",
          content: "500: Error Found when Fetching Order Details"
        });
      }

      if (!orderDetails) {
        return res.send({
          status: "failed",
          content: "404: No Order Details Found"
        });
      }

      /* -------------------------------- SET UPDATE OBJECT --------------------------------- */
      const updateObject = setCancelRefundRequestUpdateObject(orderDetails);
      /* ------------------------------- SET DUMMY VARIABLES -------------------------------- */
      const updateMethod = undefined;
      /* ---------------------- ACCESS DATABASE AND SEND TO FRONT-END ----------------------- */
      PrintOrder.updateOrderDetails(res, query, updateMethod, updateObject);
    });
  });

  /* ==================================== PROCESS REFUND ==================================== */

  // @route   POST /order/process-refund
  // @desc    Request Refund
  // @access  Private
  app.post("/order/process-refund", restrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
    const orderNumber = req.body.orderNumber;
    const ownerId = req.user._id;
    /* -------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE --------------------- */
    let query;
    if (req.user.accountType == "admin") {
      // ADMIN ACCESS
      query = { orderNumber };
    } else {
      // USER ACCESS
      query = { orderNumber, ownerId };
    }
    /* --------------------------------- SET UPDATE METHOD ---------------------------------- */
    const updateMethod = (orderDetails, updateObject) => {
      orderDetails.orderStatus = updateObject.orderStatus;
      orderDetails.requestRefundInformation.refundCompletionDate =
        updateObject.refundCompletionDate;
      orderDetails.lastUpdateDate;

      orderDetails.save((error, updateOrderDetails) => {
        // Check if error occured while saving new print order
        if (error) {
          return res.send({
            status: "failed",
            content: "500: Error Found when Saving New Updates of Order Details"
          });
        }

        const orderNumber = updateOrderDetails.orderNumber + "";

        res.send(orderNumber);
      });
    };
    /* --------------------------------- SET UPDATE OBJECT ---------------------------------- */
    const updateObject = {
      orderStatus: "Refund Processed",
      refundCompletionDate: new Date(),
      lastUpdateDate: new Date()
    };
    /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
    PrintOrder.updateOrderDetails(res, query, updateMethod, updateObject);
  });

  /* ================================ ADMIN: APPROVE REFUND ================================= */

  // @route   POST /admin/order/approve-refund
  // @desc    Approve Refund Request
  // @access  Admin
  app.post("/admin/order/approve-refund", adminRestrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
    const orderDetails = req.body.order;
    const orderNumber = orderDetails.orderNumber;
    const orderStatus = "Refund Approved";
    const lastUpdateDate = new Date();
    // Request Refund Information
    let requestRefundInformation = orderDetails.requestRefundInformation;
    requestRefundInformation.refundStatus = "approved";
    requestRefundInformation.processDate = new Date();
    /* ------------------------------------- SET QUERY -------------------------------------- */
    const query = { orderNumber };
    /* --------------------------------- SET UPDATE OBJECT ---------------------------------- */
    const updateObject = {
      orderStatus,
      requestRefundInformation,
      lastUpdateDate
    };
    /* -------------------------------- SET DUMMY VARIABLES --------------------------------- */
    const updateMethod = undefined;
    /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
    PrintOrder.updateOrderDetails(res, query, updateMethod, updateObject);
  });

  /* ================================ ADMIN: DELCINE REFUND ================================= */

  // @route   POST /admin/order/decline-refund
  // @desc    Decline Refund Request
  // @access  Admin
  app.post("/admin/order/decline-refund", adminRestrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
    const orderDetails = req.body.order;
    const orderNumber = orderDetails.orderNumber;
    const orderStatus = "Refund Declined";
    const lastUpdateDate = new Date();
    // Request Refund Information
    let requestRefundInformation = orderDetails.requestRefundInformation;
    requestRefundInformation.refundStatus = "declined";
    requestRefundInformation.processDate = new Date();
    requestRefundInformation.declineMessage =
      req.body.declineInput.reasonForDecline;
    /* ------------------------------------- SET QUERY -------------------------------------- */
    const query = { orderNumber };
    /* --------------------------------- SET UPDATE OBJECT ---------------------------------- */
    const updateObject = {
      orderStatus,
      requestRefundInformation,
      lastUpdateDate
    };
    /* -------------------------------- SET DUMMY VARIABLES --------------------------------- */
    const updateMethod = undefined;
    /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
    PrintOrder.updateOrderDetails(res, query, updateMethod, updateObject);
  });

  /* ~~~~~~~~~~~~~~~~~~~~~ REPEATED: GET ORDER DETAILS BY ORDER NUMBER ~~~~~~~~~~~~~~~~~~~~~~ */
  /* ================================== ADMIN: ORDER LIST =================================== */

  // @route   POST /admin/order
  // @desc
  // @access  Admin
  app.post("/admin/order", adminRestrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
    const orderNumber = req.body.orderNumber;
    const ownerId = req.user._id;
    /* -------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE --------------------- */
    let query;
    if (req.user.accountType == "admin") {
      // ADMIN ACCESS
      query = { orderNumber };
    } else {
      // USER ACCESS
      query = { orderNumber, ownerId };
    }
    /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
    PrintOrder.getOrderDetails(res, query);
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

  // @route   GET /admin/orders/requesting-refund
  // @desc
  // @access  Admin
  app.get(
    "/admin/orders/requesting-refund",
    adminRestrictedPages,
    (req, res) => {
      PrintOrder.find({ orderStatus: "Requesting Refund" }, (err, orders) => {
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

  /* =================================== PART'S FILE DETAILS ==================================== */

  // @route   POST /order/part/file-details
  // @desc    Fetch File Details
  // @access  Private
  app.post("/order/part/file-details", restrictedPages, (req, res) => {
    /* -------------------------- ASSIGNING AND SIMPLIFYING VARIABLES --------------------------- */

    const part = req.body;
    const fileId = mongoose.Types.ObjectId(part.fileId);

    /* ---------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE ----------------------- */

    let query;
    if (req.user.accountType == "admin") {
      // ADMIN ACCESS
      query = { _id: fileId };
    } else {
      // USER ACCESS
      query = {
        _id: fileId,
        "metadata.ownerId": req.user._id
      };
    }

    /* --------------------------- GET THE FILE DETAILS FROM DATABASE --------------------------- */

    gfs.files.findOne(query, (err, file) => {
      if (err) {
        console.log("Error Found when Fetching File Details");
        return res.send("failed");
      }

      if (!file) {
        console.log("No File Details Found");
        return res.send("failed");
      }

      return res.send(file);
    });
  });
};

/* ========================================== FUNCTION ========================================== */

/* --------------------------- SET UPDATE ORDER STATUS UPDATE OBJECT ---------------------------- */

const setUpdateOrderStatusUpdateObject = (orderDetails, accountType) => {
  let updateObject;

  if (orderDetails.orderStatus == "Awaiting Quote" && accountType == "admin") {
    updateObject = {
      orderStatus: "Awaiting Payment",
      lastUpdateDate: new Date()
    };
  } else if (orderDetails.orderStatus == "Awaiting Payment") {
    updateObject = {
      orderStatus: "Awaiting Payment Confirmation",
      lastUpdateDate: new Date()
    };
  } else if (
    orderDetails.orderStatus == "Awaiting Payment Confirmation" &&
    accountType == "admin"
  ) {
    updateObject = {
      orderStatus: "Printing Order",
      paymentConfirmationDate: new Date(),
      lastUpdateDate: new Date()
    };
  } else if (
    orderDetails.orderStatus == "Printing Order" &&
    accountType == "admin"
  ) {
    if (orderDetails.delivery == "Pickup") {
      updateObject = {
        orderStatus: "Ready for Pickup",
        lastUpdateDate: new Date()
      };
    } else {
      updateObject = {
        orderStatus: "Ready for Shipping",
        lastUpdateDate: new Date()
      };
    }
  } else if (orderDetails.orderStatus == "Ready for Pickup") {
    updateObject = {
      orderStatus: "Order Picked Up",
      orderDeliveryDate: new Date(),
      lastUpdateDate: new Date()
    };
  } else if (orderDetails.orderStatus == "Order Picked Up") {
    updateObject = {
      orderStatus: "Order Completed",
      orderCompletionDate: new Date(),
      lastUpdateDate: new Date()
    };
  } else if (
    orderDetails.orderStatus == "Ready for Shipping" &&
    accountType == "admin"
  ) {
    updateObject = {
      orderStatus: "Order Shipped",
      orderDeliveryDate: new Date(),
      lastUpdateDate: new Date()
    };
  } else if (orderDetails.orderStatus == "Order Shipped") {
    updateObject = {
      orderStatus: "Order Completed",
      orderCompletionDate: new Date(),
      lastUpdateDate: new Date()
    };
  }

  return updateObject;
};

const setCancelRefundRequestUpdateObject = orderDetails => {
  let updateObject;

  const oldOrderStatus = orderDetails.requestRefundInformation.oldOrderStatus;

  if (oldOrderStatus == "Awaiting Payment Confirmation") {
    updateObject = {
      orderStatus: "Awaiting Payment Confirmation",
      lastUpdateDate: new Date()
    };
  } else if (oldOrderStatus == "Printing Order") {
    updateObject = {
      orderStatus: "Printing Order",
      paymentConfirmationDate: new Date(),
      lastUpdateDate: new Date()
    };
  } else if (oldOrderStatus == "Ready for Pickup") {
    updateObject = {
      orderStatus: "Ready for Pickup",
      lastUpdateDate: new Date()
    };
  } else if (oldOrderStatus == "Order Picked Up") {
    updateObject = {
      orderStatus: "Order Picked Up",
      orderDeliveryDate: new Date(),
      lastUpdateDate: new Date()
    };
  } else if (oldOrderStatus == "Ready for Shipping") {
    updateObject = {
      orderStatus: "Ready for Shipping",
      lastUpdateDate: new Date()
    };
  } else if (oldOrderStatus == "Order Shipped") {
    updateObject = {
      orderStatus: "Order Shipped",
      orderDeliveryDate: new Date(),
      lastUpdateDate: new Date()
    };
  }

  return updateObject;
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

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Database Configuration
const mongoURI = require("../config/database/database").mongoURI;
// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

/* ============================= CREATE PRINT ORDER SCHEMA ============================= */

const PrintOrderSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  orderNumber: {
    type: Number
  },
  creationDate: {
    type: String
  },
  orderStatus: {
    type: String
  },
  lastUpdateDate: {
    type: String
  },
  paymentConfirmationDate: {
    type: String
  },
  orderDeliveryDate: {
    type: String
  },
  orderCompletionDate: {
    type: String
  },
  pickupBookingSchedule: {
    date: {
      type: String
    },
    month: {
      type: String
    },
    year: {
      type: String
    },
    hour: {
      type: String
    },
    minute: {
      type: String
    },
    period: {
      type: String
    }
  },
  parts: [
    {
      fileId: {
        type: String
      },
      fileName: {
        type: String
      },
      materialGroup: {
        type: String
      },
      process: {
        type: String
      },
      material: {
        type: String
      },
      orderQuantity: {
        type: Number
      },
      producedQuantity: {
        type: Number
      },
      quality: {
        type: String
      },
      strength: {
        type: String
      },
      color: {
        type: String
      }
    }
  ],
  comments: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String
      },
      createdDate: {
        type: String
      }
    }
  ],
  pricing: {
    type: String
  },
  delivery: {
    type: String
  },
  trackingNumber: {
    type: Array
  },
  ownerNote: {
    type: String
  },
  price: {
    type: Number
  },
  paymentStatus: {
    type: String
  },
  attachments: [
    {
      fileId: {
        type: String
      },
      fileName: {
        type: String
      }
    }
  ]
});

/* ====================================== EXPORT ======================================= */

module.exports = PrintOrder = conn.model("printOrders", PrintOrderSchema);

/* ===================================================================================== */

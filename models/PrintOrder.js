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
    ref: "users",
    required: true
  },
  orderNumber: {
    type: Number,
    required: true
  },
  orderStatus: {
    type: String,
    required: true
  },
  lastUpdateDate: {
    type: Date,
    required: true
  },
  parts: [
    {
      fileId: {
        type: String,
        required: true
      },
      fileName: {
        type: String,
        required: true
      },
      materialGroup: {
        type: String,
        required: true
      },
      process: {
        type: String,
        required: true
      },
      material: {
        type: String,
        required: true
      },
      orderQuantity: {
        type: Number,
        required: true
      },
      producedQuantity: {
        type: Number,
        required: true
      },
      quality: {
        type: String,
        required: true
      },
      strength: {
        type: String,
        required: true
      },
      color: {
        type: String,
        required: true
      }
    }
  ],
  comments: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
      },
      userName: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      createdDate: {
        type: Date,
        default: Date.now
      }
    }
  ],
  pricing: {
    type: String,
    required: true
  },
  delivery: {
    type: String,
    required: true
  },
  ownerNote: {
    type: String
  },
  attachments: [
    {
      fileId: {
        type: String,
        required: true
      },
      fileName: {
        type: String,
        required: true
      }
    }
  ]
});

/* ====================================== EXPORT ======================================= */

module.exports = PrintOrder = conn.model("printOrders", PrintOrderSchema);

/* ===================================================================================== */

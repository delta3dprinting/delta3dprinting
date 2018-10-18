const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Database Configuration
const mongoURI = require("../config/database/database").mongoURI;
// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

/* ============================= CREATE PRINT ORDER SCHEMA ============================= */

const UserProfileSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  firstname: {
    type: String
  },
  middlenames: {
    type: String
  },
  lastname: {
    type: String
  },
  shippingAddress: {
    type: String
  }
});

/* ====================================== EXPORT ======================================= */

module.exports = UserProfile = conn.model("userProfiles", UserProfileSchema);

/* ===================================================================================== */

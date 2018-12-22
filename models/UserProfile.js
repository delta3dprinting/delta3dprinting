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
  firstName: {
    type: String
  },
  middleNames: {
    type: String
  },
  lastName: {
    type: String
  },
  shippingAddress: {
    streetNumber: {
      type: String
    },
    streetName: {
      type: String
    },
    suburb: {
      type: String
    },
    city: {
      type: String
    },
    postcode: {
      type: String
    },
    country: {
      type: String
    }
  }
});

/* ================================== STATIC METHODS =================================== */

/* -------------------------- GET PROFILE DETAILS (FIND ONE) --------------------------- */

UserProfileSchema.statics.getProfileDetails = function(
  res,
  query,
  filter,
  method,
  object
) {
  return this.findOne(query, (error, profileDetails) => {
    if (error) {
      return res.send({
        status: "failed",
        error: "500: Error Found when Fetching Profile Details"
      });
    }

    if (!profileDetails) {
      return res.send({
        status: "failed",
        error: "404: No Profile Found"
      });
    }

    if (filter) {
      const filteredProfileDetails = filter(profileDetails);
      return res.send({
        status: "success",
        profileDetails: filteredProfileDetails
      });
    }

    if (method) {
      return method(profileDetails, object);
    }

    return res.send({
      status: "success",
      profileDetails
    });
  });
};

/* ====================================== EXPORT ======================================= */

module.exports = UserProfile = conn.model("userProfiles", UserProfileSchema);

/* ===================================================================================== */

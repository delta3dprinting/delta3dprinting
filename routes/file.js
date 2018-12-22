/* ======================================== MODULES ========================================= */

const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

/* ======================================== IMPORTS ========================================= */

const FileModel = require("../models/File");

/* ========================================= EXPORT ========================================= */

module.exports = (app, passport, upload, conn) => {
  /* ================================ SET MONGODB CONNECTION ================================ */

  let gfs;

  conn.once("open", () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("fs");
  });

  /* =============================== DOWNLOAD FILE BY FILE ID =============================== */

  // @route   GET /file/download/:fileId
  // @desc    Download File
  // @access  Private
  app.get("/file/download/:fileId", restrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
    const fileId = mongoose.Types.ObjectId(req.params.fileId);
    /* -------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE --------------------- */
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
    /* ----------------------- ACCESS DATABASE AND SEND TO FRONT-END ------------------------ */
    FileModel.downloadFile(gfs, res, query);
  });

  /* ============================= GET FILE DETAILS BY FILE ID ============================== */

  // @route   POST /file/get-file-details/file-id
  // @desc    Get File Details by File ID
  // @access  Private
  app.post("/file/get-file-details/file-id", restrictedPages, (req, res) => {
    /* ------------------------ ASSIGNING AND SIMPLIFYING VARIABLES ------------------------- */
    const fileId = mongoose.Types.ObjectId(req.body.fileId);
    /* -------------------- SETTING MONGOOSE QUERY BASED ON ACCESS TYPE --------------------- */
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
    /* ------------------------------------- SET FILTER ------------------------------------- */
    // Set the details that will be sent to front-end
    const filter = file => {
      return {
        fileName: file.filename,
        fileDetail: file.metadata
      };
    };
    /* ----------------- ACCESS DATABASE AND SEND FILE DETAILS TO FRONT-END ----------------- */
    FileModel.getFileDetails(gfs, res, query, filter);
  });
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

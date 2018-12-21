/* ================================ DECLARE FILE OBJECT ================================ */

let FileModel = {};

/* =========================== GET FILE DETAILS ARRAY (FIND) =========================== */

FileModel.getFileDetailsArray = function(
  gfs,
  res,
  query,
  filter,
  method,
  object
) {
  return gfs.files.find(query, (error, fileDetailsArray) => {
    if (error) {
      return res.send({
        status: "failed",
        content: "500: Error Found when Fetching File Details"
      });
    }

    if (!fileDetailsArray) {
      return res.send({
        status: "failed",
        content: "404: No File Details Found"
      });
    }

    if (filter) {
      let filteredFileDetailsArray;
      for (let i = 0; i < fileDetailsArray.length; i++) {
        filteredFileDetailsArray.push(filter(fileDetailsArray[i]));
      }
      return res.send({
        status: "success",
        content: filteredFileDetailsArray
      });
    }

    if (method) {
      return method(fileDetailsArray, object);
    }

    return res.send({
      status: "success",
      content: fileDetailsArray
    });
  });
};

/* ============================ GET FILE DETAILS (FIND ONE) ============================ */

FileModel.getFileDetails = function(gfs, res, query, filter, method, object) {
  return gfs.files.findOne(query, (error, fileDetails) => {
    if (error) {
      return res.send({
        status: "failed",
        content: "500: Error Found when Fetching File Details"
      });
    }

    if (!fileDetails) {
      return res.send({
        status: "failed",
        content: "404: No File Details Found"
      });
    }

    if (filter) {
      const filteredFileDetails = filter(fileDetails);
      return res.send({
        status: "success",
        content: filteredFileDetails
      });
    }

    if (method) {
      return method(fileDetails, object);
    }

    return res.send({
      status: "success",
      content: fileDetails
    });
  });
};

/* ====================================== EXPORT ======================================= */

module.exports = FileModel;

/* ===================================================================================== */

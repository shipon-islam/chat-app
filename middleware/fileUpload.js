const path = require("path");
const multer = require("multer");

const fileUpload = (subFolder) => {
  const uploadFolder = `${__dirname}/../public${subFolder}`;
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split("")
          .join("") +
        "_" +
        Date.now();
      cb(null, fileName + fileExt);
    },
  });
  const upload = multer({ storage: storage });
  return upload;
};

function uploadFile(folder) {
  const file = (req, res, next) => {
    fileUpload(folder).any()(req, res, (err) => {
      if (err) {
        res.status(500).json({
          errors: {
            avatar: {
              msg: err.message,
            },
          },
        });
      } else {
        next();
      }
    });
  };
  return file;
}

module.exports = { uploadFile };

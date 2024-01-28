const cloudinary = require("cloudinary");
const { Readable } = require("stream");
const {
  CLOUDNARY_CLOUD_NM,
  CLOUDNARY_API_KEY,
  CLOUDNARY_SECRET,
} = require("../envVariable");

cloudinary.config({
  cloud_name: CLOUDNARY_CLOUD_NM,
  api_key: CLOUDNARY_API_KEY,
  api_secret: CLOUDNARY_SECRET,
});

const cloudUploadStream = (folder, buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream(
        { folder: folder, resource_type: "raw", format: "jpg" },
        function (error, result) {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      )
      .end(buffer);
  });
};

const cloudUpload = async (file, path) => {
  try {
    const result = await cloudinary.v2.uploader.upload(file, {
      resource_type: "image",
      folder: path,
      unique_filename: false,
      use_filename: true,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const cloudRemove = async (file, path) => {
  try {
    const result = await cloudinary.v2.uploader.destroy(file, {
      invalidate: true,
      resource_type: "image",
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  cloudUpload,
  cloudRemove,
  cloudUploadStream,
};

import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  //kha file rkhni hai
  filename: function (req, file, cb) {
    // cb(null, file.originalname);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({
  storage,
});
//multer middelware is used to handle file uploads in Node.js applications. It provides a way to process multipart/form-data, which is commonly used for uploading files. In this code snippet, the multer middleware is configured to store uploaded files in a temporary directory and generate unique filenames based on the current timestamp and the original filename. The `upload` variable is exported for use in other parts of the application, allowing developers to easily handle file uploads in their routes or controllers.

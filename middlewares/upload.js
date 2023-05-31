const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;

//   filename: (req, file, cb) => {
//     cb(
//       null,
//       Jimp.read(file.originalname, (err, filename) => {
//         if (err) throw err;
//         filename.resize(250, 250);
//     );
//   },

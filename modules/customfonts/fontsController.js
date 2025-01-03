// const { fileURLToPath } = require("url");
// const { dirname, join } = require("path");
// const fs = require("fs");

// exports.getAllfonts = async (req, res) => {
//   fs.readdir(fontsDir, (err, files) => {
//     if (err) {
//       return res.status(500).json({ message: "Error reading fonts directory" });
//     }

//     // Filter .ttf files
//     const fontFiles = files.filter((file) => file.endsWith(".ttf"));
//     const fonts = fontFiles.map((file) => {
//       const [family, styleDelExt] = file.replace(".ttf", "").split("-");
//       return {
//         name: file.replace(".ttf", "").replace("-", " "),
//         family,
//         style: styleDelExt,
//         file,
//       };
//     });

//     res.json(fonts);
//   });
// };

// exports.getFont = async (req, res) => {
//   const { fontName } = req.params;
//   const fontFilePath = join(fontsDir, fontName + ".ttf");

//   res.sendFile(fontFilePath, (err) => {
//     if (err) {
//       res.status(err.status).end();
//     }
//   });
// };

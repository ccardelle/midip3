const express = require("express");
const { isLoggedIn } = require("../middlewares");
const Midi = require("../models/Midi");
const uploadCloud = require("../configs/cloudinary");
const router = express.Router();

router.get("/secret", isLoggedIn, (req, res, next) => {
  res.json({
    secret: 42,
    user: req.user
  });
});

router.get("/profile", (req, res, next) => {
  User.find()
    .then(allTheUsers => {
      res.json("profile", { users: allTheUsers });
    })
    .catch(err => {
      next(err);
    });
});

// router.post("/upload", uploadCloud.single("midi-file"), (req, res, next) => {
//   Midi.create({
//     name: req.body.name,
//     description: req.body.description,
//     file: req.file.url
//   })
//     .then(() => {
//       res.redirect("/profile");
//       res.json({ sucess: "heeey" });
//     })
//     .catch(err => {
//       next(err);
//     });
// });

// Create MIDI File
router.post(
  "/upload",
  uploadCloud.single("the-profile-pic"),
  (req, res, next) => {
    Midi.create({
      name: req.body.name,
      description: req.body.description,
      file: req.file.url
    })
      .then(() => {
        res.json({ data: req.body });
      })
      .catch(err => {
        next(err);
      });
  }
);

module.exports = router;

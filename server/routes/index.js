const express = require("express");
const { isLoggedIn } = require("../middlewares");
const Jokes = require("../models/Jokes");
// const multer = require("multer");
// const uploadCloud = require("../configs/cloudinary");
const router = express.Router();
// const S3RemoteUploader = require("../configs/s3").S3RemoteUploader;

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

router.post("/upload", (req, res, next) => {
  console.log("This is from the front end", req.body, req.user._id);
  Jokes.create({
    title: req.body.title,
    joke: req.body.joke,
    owner: req.user._id
  })
    .then(() => {
      res.redirect("/secret");
      // res.json({ success: "heeey" });
    })
    .catch(err => {
      next(err);
    });
  // .then(allTheUsers => {
  //   res.json("profile", { users: allTheUsers });
  // })
  // .catch(err => {
  //   next(err);
  // });
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
// router.post(
//   "/CHANGEMEBACK/upload",
//   uploadCloud.single("file"),
//   (req, res, next) => {
//     console.log(
//       req.body.name,
//       "==============",
//       req.body.description,
//       "==============",
//       req.body.file,
//       "==============",
//       req.file
//     );

// Midi.create({
//   name: req.body.name,
//   description: req.body.description,
//   file: req.body.file
// })

//     Midi.create({ file: req.file })
//       .then(res => {
//         res.json({ data: res });
//       })
//       .catch(err => {
//         next(err);
//       });
//   }
// );

// var storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function(req, file, cb) {
//     console.log("file", file);
//     cb(null, file.fieldname + "-" + Date.now());
//   }
// });
// var upload = multer({ storage: storage });
// router.post("/upload", upload.single("file"), (req, res, next) => {
//   const file = req.file;
//   if (!file) {
//     const error = new Error("Please upload a file");
//     error.httpStatusCode = 400;
//     return next(error);
//   }
//   res.json({ file: file });
//   res.send(file);
// });

// router.post("/upload", uploadCloud.single("file"), (req, res, next) => {
//   console.log("what the file BACK END >>>>>>>>>>> ", req.file);
//   console.log(
//     "what the body +++++++++++ BACK END BODY",
//     req.body,
//     "======================= BACK END DATA",
//     req.file
//   );

//   Midi.create({ file: req.file })
//     .then(result => {
//       console.log("saved MIDI", result);
//       res.json({ saved: result });
//     })
//     .catch(err => console.error(err));
// });
// router.post("/upload", (req, res, next) => {
//   console.log("what the file BACK END >>>>>>>>>>> ", req.file);
//   console.log(
//     "what the body +++++++++++ BACK END BODY",
//     req.body,
//     "======================= BACK END DATA",
//     req.params
//   );
// });

// router.post("/upload", (req, res, next) => {
//   console.log("what the file BACK END >>>>>>>>>>> ", req.file);
//   console.log(
//     "what the body +++++++++++ BACK END BODY",
//     req.body,
//     "======================= BACK END DATA",
//     req.file
//   );

//   test = () => {
//     console.log("RUNNING AWS UPLOAD");
//     testUpload = new S3RemoteUploader(
//       "https://lovelace-media.imgix.net/getty/146659397.jpg"
//     );
//     testUpload.dispatch().then(r => {
//       expect(r.Location).toBe("https://s3.bucket.url.already.known");
//     });
//   };

//   Midi.create({ file: req.file })
//     .then(result => {
//       console.log("saved MIDI", result);
//       res.json({ saved: result });
//     })
//     .catch(err => console.error(err));
// });

// test("uploads a file to S3 bucket", () => {
//   testUpload = new S3RemoteUploader(req.file);
//   testUpload.dispatch().then(r => {
//     expect(r.Location).toBe("https://s3.bucket.url.already.known");
//   });
// });
// router.post("/updatePhoto", (req, res, next) => {
//   console.log("the info when updated the picture................ ", req.body);
//   Picture.findById(req.body.imageInfo._id)
//     .then(thePic => {
//       thePic.description = req.body.description;
//       thePic
//         .save()
//         .then(updatedPic => {
//           res.json({ thePhoto: updatedPic });
//         })
//         .catch(err => console.log(err));
//     })
//     .catch(err => console.log(err));
// });

module.exports = router;

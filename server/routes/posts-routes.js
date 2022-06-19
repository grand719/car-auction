const express = require("express");
const { check } = require("express-validator");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();
const postsControllers = require("../controllers/posts-controllers");

router.get("/", postsControllers.getPosts);

router.get("/user/:pesel", postsControllers.getPostsByUserPesel);

router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("telephoneNumber").not().isEmpty(),
    check("price").not().isEmpty(),
    check("date").not().isEmpty(),
    check("vin").not().isEmpty(),
    check("pesel").not().isEmpty(),
  ],
  postsControllers.createPost
);

router.post("/:id", postsControllers.addBid);
router.delete("/:id", postsControllers.deletePost);

module.exports = router;

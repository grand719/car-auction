const fs = require("fs");

const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const getUserWiningAuctions = require("../helpers/getUserWiningAuctions");

const Post = require("../models/post");
const mongoose = require("mongoose");

const getPosts = async (req, res, next) => {
  let post;

  try {
    post = await Post.find({});
  } catch (e) {
    const error = new HttpError(
      "Some thing went wrong Could not find places for provaided user id",
      500
    );

    return next(error);
  }

  if (!post) {
    const error = new HttpError("Could not find place for provaided id", 404);

    return next(error);
  }
  res.json({ post });
};

const getPostsByUserPesel = async (req, res, next) => {
  const { pesel } = req.params;

  let userPosts;
  let auctions;

  try {
    userPosts = await Post.find({ pesel: pesel });
    auctions = await Post.find({});
  } catch (e) {
    const error = new HttpError("Smoe thing went wrong", 500);
    return next(error);
  }

  if (!userPosts || userPosts.length === 0) {
    const error = new HttpError(
      "Could not find places for provaided user id",
      404
    );

    return next(error);
  }

  res.json({
    posts: userPosts,
    winingPosts: getUserWiningAuctions(auctions),
  });
};

const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, telephoneNumber, price, date, vin, pesel } =
    req.body;

  const createdPost = new Post({
    title,
    description,
    telephoneNumber,
    price: price,
    date,
    vin,
    pesel,
    image: req.file.path,
  });

  try {
    await createdPost.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPost });
};

const addBid = async (req, res, next) => {
  const { id } = req.params;

  let post;

  try {
    post = await Post.findById(id);
  } catch (e) {
    const error = new HttpError("Some thing went wrong ", 500);
    return next(error);
  }
  const bid = {
    ...req.body,
    bidValue: +req.body.bidValue + post.price,
  };
  post.bids = post.bids.concat(bid);
  console.log(bid);
  try {
    await post.save();
  } catch (e) {
    console.log(e);
    const error = new HttpError("Some thing went wrong cant update place", 500);
    return next(error);
  }

  res.status(200).json({ place: post.toObject({ getters: true }) });
};

const deletePost = async (req, res, next) => {
  const { id } = req.params;

  let post;
  try {
    post = await Post.findById(id);
  } catch (e) {
    const error = new HttpError("Some thing went Cant delete place", 500);
    return next(error);
  }

  if (!post) {
    const error = new HttpError("Could not find place for this id", 404);
    return next(error);
  }

  const imagePath = post.image;

  try {
    await post.remove();
  } catch (e) {
    const error = new HttpError("Some thing went Cant delete place", 500);
    return next(error);
  }

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({ message: "Deleted place." });
};

exports.getPostsByUserPesel = getPostsByUserPesel;
exports.getPosts = getPosts;
exports.addBid = addBid;
exports.createPost = createPost;
exports.deletePost = deletePost;

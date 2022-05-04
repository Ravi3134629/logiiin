const router = require("express").Router();
const User = require("../models/users");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Middleware for authenticate
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(req.headers);
  console.log(token);
  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
  try {
    const isValid = await jwt.verify(token, process.env.APPLICATION_SECRET);
    if (!isValid) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    req.user = isValid._id;
    next();
  } catch {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
router
  .get("/user", authenticate, async (req, res) => {
    const { user } = req;
    const u = await User.findOne({ _id: user });
    let res_obj = {};
    res_obj.name = u.name;
    res_obj.email = u.email;
    res_obj.active_plan = u.active_plan;
    res.status(200).send(res_obj);
  })
  .post("/login", async (req, res) => {
    const { email, password } = req.body;

    // first check is user present in database or not
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send("User not found");
    }
    // check password
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).send("Invalid Username & Password");
    }

    const token = await jwt.sign(
      { _id: user._id },
      process.env.APPLICATION_SECRET
    );

    res.status(200).send({ token });
  })
  .post("/signup", async (req, res) => {
    const { email, name, password, priority } = req.body;
    console.log(req.body);
    // first check if user already present in database or not
    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .send({ success: false, message: "User already exists" });
    }

    const hash = await bcryptjs.hash(password, 10);
    // create a new entry for the user in database
    const newUser = new User({
      email,
      name,
      password: hash,
      active_plan: priority,
    });
    newUser
      .save()
      .then((done) => {
        if (done) {
          res
            .status(200)
            .send({ success: true, message: "User created successfully" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .put(
    "/upgrade/plan/:priority/:current_priority",
    authenticate,
    (req, res) => {
      const { priority, current_priority } = req.params;
      const { user } = req;

      // first check your incoming priority greater then current_priority
      if (priority < current_priority) {
        return res
          .status(400)
          .send({ success: false, message: "You can't downgrade your plan" });
      }
      User.findOneAndUpdate(
        { _id: user },
        { active_plan: priority },
        { new: true },
        (err, doc) => {
          if (err) {
            res.status(400).send(err);
          }
          res.status(200).send({ success: true, data: doc });
        }
      );
    }
  );

module.exports = router;

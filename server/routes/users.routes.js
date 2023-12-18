const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verfiyJWT = require("../configuration/verfiy");

const secret = process.env.MY_SECRET;

router.get("/", async (req, res) => {
  const userList = await User.find().select("-passwordHash");

  if (!userList) {
    res.status(500).json({ success: false });

  }

  res.send(userList);
});

// Get all Users

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(500).json({ success: false });
  }

  res.send(user);
});

// Create new User

router.post("/register", async (req, res) => {
  let userCheck = {};
  userCheck = await User.findOne({ email: req.body.email });

  if (userCheck) {
    res
      .status(500)
      .json({ success: false, message: "Email Already registered" });
  } else {
    // res.json({test:"posted"})
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      street: req.body.street,
      appartment: req.body.appartment,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
    });

    user
      .save()
      .then((createUser) => {
        return res.status(201).json(createUser);
      })
      .catch((e) => {
        return res.status(500).json({
          error: e,
          success: false,
        });
      });
  }
});


router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).send("User not found!");
  } else {
    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
      const token = jwt.sign(
        {
          userId: user.id,
          userEmail:user.email,
          userName:user.name,
          isAdmin:user.isAdmin
        },
        secret,
        {
          expiresIn:'1d'
        }
      );

      return res.status(200).send({
        message: "Logged in Successfully",
        user: user,
        token: token,
      });
    } else {
      return res.status(404).send("Password is Wrong");
    }
  }
});



router.get('/refresh/token',verfiyJWT,(req,res)=>{
  res.send("Verfied Token Bro");
})




/// Count Total Number of Products

router.get("/get/count", async (req, res) => {
  const userCount = await User.countDocuments({});

  if (!userCount) {
    res.status(500).json({ success: false });
  }

  res.send({ userCount });
});

router.put("/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      passwordHash: req.body.passwordHash,
      street: req.body.street,
      appartment: req.body.appartment,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
    },
    {
      new: true,
    }
  );

  if (!user) {
    return res.status(404).send("Category Can't be created");
  }

  res.send(user);
});

//delete User by ID

router.delete("/:id", async (req, res) => {
  const user = User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user) {
        return res.status(200).json({
          success: true,
          message: req.params.id + "User Deleted",
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "User Not Found!" });
      }
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        error: error,
      });
    });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { Category } = require("../models/category.model");

router.get("/", async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }

  res.status(200).send(categoryList);
});

// update category data

router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    {
      new: true,
    }
  );

  if (!category) {
    return res.status(404).send("Category Can't be created");
  }

  res.send(category);
});

// View Category with Id => /categories/:id

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(500).json({
      success: false,
      message: "Category not found, rather it was removed",
    });
  } else {
    res.status(200).send(category);
  }
});

router.post("/", async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });

  category = await category.save();

  if (!category) {
    return res.status(404).send("Category Can't be created");
  }

  res.send(category);
});



// delete category by ID

router.delete("/:id", (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res.status(200).json({
          success: true,
          message: "Category Delete",
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Category Not Found!" });
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

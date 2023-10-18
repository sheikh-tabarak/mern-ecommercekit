const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Product } = require("../models/products.model");
const { Category } = require("../models/category.model");
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Invalid Image");

    if (isValid) {
      uploadError = null;
    }

    cb(uploadError, "public/uploads/products");
  },
  filename: function (req, file, cb) {
    // file.mimetype();
    const fileName = file.originalname.replace(" ", "-");
    const extention = FILE_TYPE_MAP[file.mimetype];
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${fileName}-${Date.now()}.${extention}`);
  },
});

const uploadImage = multer({ storage: storage });

/// Get all Products

router.get("/", async (req, res) => {
  let filter = {};
  if (req.query.category) {
    filter = { category: req.query.category.split(",") };
  }

  const productList = await Product.find(filter).populate("category");

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(productList);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(500).json({ success: false });
  } else {
    res.status(200).send(product);
  }
});

// Get featured Products

router.get("/get/featured/:count", async (req, res) => {
  const count = req.params.count ? req.params.count : 10;
  const productList = await Product.find({ isFeatured: true })
    .limit(+count)
    .populate("category");

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(productList);
});

/// Count Total Number of Products

router.get("/get/count", async (req, res) => {
  const productCount = await Product.countDocuments({});

  if (!productCount) {
    res.status(500).json({ success: false });
  }

  res.send({ productCount });
});

/// Create new Product [post]

router.post(`/`, uploadImage.single("image"), async (req, res) => {
  if (!mongoose.isValidObjectId(req.body.category)) {
    return res.status(400).json({
      error: "Invalid Category ID Format",
      success: false,
    });
  }

  const file = req.file;

  if (!file) {
    return res.status(400).json({
      error: "No file Attached",
      success: false,
    });
  }

  const filaName = req.file.filename;
  const basePath = `${req.protocol}://${req.get(
    "host"
  )}/public/uploads/products/`;

  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).json({
      error: "Invalid Category",
      success: false,
    });
  } else {
    const products = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      image: `${basePath}${filaName}`,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock,
      rating: req.body.rating,
      isFeatured: req.body.isFeatured,
      dataCreated: req.body.dataCreated,
    });

    products
      .save()
      .then((createProduct) => {
        return res.status(201).json(createProduct);
      })
      .catch((e) => {
        return res.status(500).json({
          error: e,
          success: false,
        });
      });
  }
});

/// Create an Image Gallery as Product Gallery and Update request [update]

router.put(
  "/product-gallery/:id",
  uploadImage.array("images",10),
  async (req, res) => {
    
   

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        error: "Invalid Image ID Format",
        success: false,
      });
    }

    const basePath = `${req.protocol}://${req.get(
      "host"
    )}/public/uploads/products/`;

    let ImageArray = [];
    const files = req.files;
    console.log(files);
    if (files) {
      files.map(file => {
        ImageArray.push(`${basePath}${file.filename}`);
      });
    } 
    // else {
    //   return res.status(400).json({
    //     error: "No Images Selected",
    //     success: false,
    //   });
    // }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        images: ImageArray,
      },
      {
        new: true,
      }
    );

    if (!product) {
      return res.status(404).send("Product Can't be Updated");
    }

    res.send(product);
  }
);

/// Update a product by ID [put]

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      error: "Invalid Product ID Format",
      success: false,
    });
  }
  const category = await Category.findById(req.body.category);

  if (!category) {
    return res.status(400).json({
      error: "Invalid Category",
      success: false,
    });
  } else {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured,
        dataCreated: req.body.dataCreated,
      },
      {
        new: true,
      }
    );

    if (!product) {
      return res.status(404).send("Product Can't be Updated");
    }

    res.send(product);
  }
});

/// Delete a Product by ID [delete]

router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res.status(200).json({
          success: true,
          message: req.params.id + " Product Deleted",
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Product Not Found!" });
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

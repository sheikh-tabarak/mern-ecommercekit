const express = require("express");
const router = express.Router();
const { Order } = require("../models/order.model");
const { User } = require("../models/user.model");
const { OrderItem } = require("../models/orderItem.model");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const orderList = await Order.find()
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    })
    .sort({ dateOrdered: -1 });

  if (!orderList) {
    res.status(500).json({ success: false });
  }

  res.send(orderList);
});

// Get Order by Id
router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    });

  if (!order) {
    res.status(500).json({ success: false });
  }

  res.send(order);
});

// update order status

router.put("/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    {
      new: true,
    }
  );

  if (!order) {
    return res.status(404).send("Order status didn't change");
  }

  res.send(order);
});

/// Count Total Number of Orders

router.get("/get/count", async (req, res) => {
  const orderCount = await Order.countDocuments({});

  if (!orderCount) {
    res.status(500).json({ success: false });
  }

  res.send({ orderCount });
});

/// Create new Order [post]

router.post(`/`, async (req, res) => {
  if (!mongoose.isValidObjectId(req.body.user)) {
    return res.status(400).json({
      error: "Invalid User ID Format",
      success: false,
    });
  }

  const user = await User.findById(req.body.user);

  if (!user) {
    return res.status(400).json({
      error: "Invalid User",
      success: false,
    });
  } else {
    const allOrderItems = Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        const orderitem = new OrderItem({
          product: orderItem.product,
          quantity: orderItem.quantity,
        });
        await orderitem.save();
        return orderitem._id;
      })
    );
    const OrderItemResolved = await allOrderItems;

    const totalPrices = await Promise.all(
      OrderItemResolved.map(async (orderItemId) => {
        const orderitem = await OrderItem.findById(orderItemId).populate(
          "product",
          "price"
        );

        const totalPrice = orderitem.product.price * orderitem.quantity;
        return totalPrice;
      })
    );

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    console.log(totalPrice);
    const order = new Order({
      orderItems: OrderItemResolved,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      totalPrice: +totalPrice,
      user: req.body.user,
      dateOrdered: req.body.dateOrdered,
    });

    order
      .save()
      .then((order) => {
        return res.status(201).json(order);
      })
      .catch((e) => {
        return res.status(500).json({
          error: e,
          success: false,
        });
      });
  }
});

router.get("/get/totalsales", async (req, res) => {
  const totalSales = await Order.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$totalPrice" },
     
        // _id:'$_id',
        // totalsales: {'$totalPrice'
      },
    },
  ]);

  if (!totalSales) {
    res.status(400).json({ success: false, message: "Can't get sales data" });
  }

  res.send({ totalsales: totalSales });
});

// delete order by ID

router.delete("/:id", (req, res) => {
  Order.findByIdAndRemove(req.params.id)
    .then(async (order) => {
      if (order) {
        await order.orderItems.map(async (orderItem) => {
          await OrderItem.findByIdAndRemove(orderItem._id).then(
            (orderItemis) => {
              if (orderItemis) {
                console.log("Order Item Deleted");
              }
            }
          );
        });

        return res.status(200).json({
          success: true,
          message: "Order Deleted",
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Order Not Found!" });
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

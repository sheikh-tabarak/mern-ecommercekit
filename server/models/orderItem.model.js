const mongoose = require("mongoose");

const OrderItemSchema = mongoose.Schema({

    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity:{
        type: Number,
        required: true,
      },

  
  
});

exports.OrderItem = mongoose.model("OrderItem", OrderItemSchema);

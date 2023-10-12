const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({

    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem",
        required: true,
      }],

      shippingAddress1:{
        type:String,
        required:true
      },
      shippingAddress2:{
        type:String,
        required:false
      },
      city:{
        type:String,
        required:true
      },
      zip:{
        type:String,
      },

      country:{
        type:String,
        required:false
      },
      phone:{
        type:Number,
        required:false
      },
      status:{
        type:String,
        required:false
    , default:'Pending'
      },
      totalPrice:{
        type:Number,
      },

      user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      dateOrdered:{
        type:Date,
        default:Date.now
      }
  
});


OrderSchema.virtual('id').get(function (){
    return this._id.toHexString()
  });
  
  
  OrderSchema.set('toJSON',{
    virtuals:true
  })


exports.Order = mongoose.model("Order", OrderSchema);

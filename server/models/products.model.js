const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  richDescription: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  images: [
    {
      type: String,
    },
  ],

  brand: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  rating: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  dataCreated: {
    type: Date,
    default: Date.now,
  },
});


ProductSchema.virtual('id').get(function (){
  return this._id.toHexString()
});


ProductSchema.set('toJSON',{
  virtuals:true
})


// const ProductSchema = mongoose.Schema({
//   name: String,
//   image: String,
//   stock: Number,
// })

// const Product = mongoose.model("Product", ProductSchema);

exports.Product = mongoose.model("Product", ProductSchema);

// export default ProductSchema;

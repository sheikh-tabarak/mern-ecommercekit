const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  street: {
    type: String,
  },
  appartment: {
    type: String,
  },
  city: {
    type: String,
  },
  zip: {
    type: String,
  },
  country: {
    type: String,
  },
  phone: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
});


UserSchema.virtual('id').get(function (){
  return this._id.toHexString()
});


UserSchema.set('toJSON',{
  virtuals:true
})

exports.User = mongoose.model("User", UserSchema);

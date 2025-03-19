const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true,"please enter your name"],
    trim:true
  },
  lastname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  mobile: {
   type: String,
   unique: true
  },
  password: {
    type: String,
    required: true, 
  },
  Addresses: [
    {
      AName: {
        type: String,
      },
      Number: {
        type: String,
      },
      Pincode: {
        type: Number,
      },
      State: {
        type: String,
      },
      City: {
        type: String,
      },
      HNo: {
        type: String,
      },
      StreetDet: {
        type: String,
      },
      LandMark: {
        type: String,
      },
      AreaDet: {
        type: String,
      },

      Address: {
        type: String,
      },
      Type: {
        type: String,
        default: "Home",
      },
      Tag: {
        type: String,
      },
      prime: {
        type: Boolean,
        default: false,
      }
    },
  ]
}, { timestamps: true }); 

module.exports = mongoose.model("User", authSchema);

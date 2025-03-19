const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const OrderSchema = mongoose.Schema({
  ClientId: {
    type: mongoose.Schema.ObjectId,
    ref: "Client",
    required: true,
  },
  ClientName: {
    type: String,
  },
  TotalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  Email: {
    type: String,
  },
  wallet: {
    type: Number,
    default: 0,
  },
  DeliveryCharge: {
    type: Number,
    default: 0,
  },
  GrandTotal: {
    type: Number,
    required: true,
    default: 0,
  },
  Address: {
    type: String,
    required: true,
  },
  AreaName: {
    type: String,
  },
  Mobile: {
    type: String,
    required: true,
  },
  PaymentMode: {
    type: String,
    default: "Cash on Delivery",
  },
  PaymentStatus: {
    type: String,
  },
  DeliveredDate: {
    type: Date,
  },
  TxnId: {
    type: String,
  },
  hashCode: {
    type: String,
    default: "kisanghar",
  },
  CurrentStatus: {
    type: String,
  },
  ExpectedDelDate: Date,

  Status: {
    type: Number,
    default: 1,
  },
  StatusText: {
    type: String,
    default: "Order Recieved",
  },
  ProductCount: {
    type: Number,
  },
  Saving: {
    type: Number,
    default: 0,
  },
  Cashback: {
    type: Number,
    default: 0,
  },

  couponDetails: {
    coupon: {
      type: mongoose.Schema.ObjectId,
      ref: "Coupon",
    },
    couponCode: {
      type: String,
    },
    couponDis: {
      type: Number,
      default: 0,
    },
    CouponTitle: {
      type: String,
    },
    CouponDescription: {
      type: String,
    },
  },

  Delivery: {
    DID: {
      type: mongoose.Schema.ObjectId,
      ref: "Employee",
    },
    DName: {
      type: String,
    },
    DMobile: {
      type: String,
    },
  },

  OrderProducts: [
    {
      ProductId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "product Id Required"],
        ref: "Grocery",
      },
      ProductName: {
        type: String,
        required: true,
      },
      // superCategoryId: {
      //   type: mongoose.Schema.ObjectId,
      //   ref: "Supercategory",
      // },

      superCategory: {
        type: String,
      },
      CatId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Category Id Required"],
        ref: "Category",
      },

      SubCatId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "subCategoryId Required"],
        ref: "Subcategory",
      },
      SubCat: {
        type: String,
        required: [true, "Please enter Sub-Category"],
      },
      packsizeId: {
        type: String,
      },
      CatName: {
        type: String,
        required: true,
      },
      Brand: {
        type: String,
        required: [true, "Please provide brand "],
        default: "Brand",
      },
      ItemName: {
        type: String,
        required: [true, "Please provide ItemName"],
      },
      PackSize: {
        type: String,
      },
      Description: {
        type: String,
      },
      ImgUrl: {
        type: String,
      },
      Price: {
        type: Number,
        required: true,
        default: 0,
      },
      Qty: {
        type: Number,
        required: true,
        default: 1,
      },
      TotalAmount: {
        type: Number,
        required: true,
        default: 0,
      },
      Mrp: {
        type: Number,
        required: true,
        default: 0,
      },
      TotalPrice: {
        type: Number,
        required: true,
        default: 0,
      },
      TotalMrp: {
        type: Number,
        required: true,
        default: 0,
      },
      Discount: {
        type: Number,
        default: 0,
      },
      Status: {
        type: Boolean,
        default: true,
      },
      Cashback: {
        type: Boolean,
        default: false,
      },
    },
  ],
  remark: {
    BookedOrdersRemark: {
      type: String,
      default: "Your Order has been placed",
      // default: "",
    },
    OrderprocessingRemark: {
      type: String,
      default: "Team has processed your order",
    },
    OrderDispatchedRemark: {
      type: String,
      default: "Your Order has been picked up by courier partner",
    },
    OutfordeliveryRemark: {
      type: String,
      default: "Your item is out for delivery",
    },
    OrderDeliveredRemark: {
      type: String,
      default: "Your item has been delivered",
    },
    OrderCancelRemark: {
      type: String,
      default: "Your delivery is cancelled",
    },
    OrderDeliveredAgentRemark: {
      type: String,
    },
  },

  OrderprocessDate: {
    OrderprocessingDate: {
      type: Date,
      default: Date.now,
    },
    OrderDispatchedDate: {
      type: Date,
      default: Date.now,
    },
    OutfordeliveryDate: {
      type: Date,
      default: Date.now,
    },
    OrderDeliveredDate: {
      type: Date,
      default: Date.now,
    },
    OrderCancelledDate: {
      type: Date,
      default: Date.now,
    },
    OrderCancelledDate1: {
      type: Date,
      // default: Date.now(),
    },
  },
  resetOrderToken: String,
  resetOrderExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

OrderSchema.pre("save", async function (next) {
  if (!this.isModified("hashCode")) {
    next();
  }

  this.hashCode = await bcrypt.hash(this.hashCode, 10);
});

OrderSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

OrderSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetOrderToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetOrderExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("Order", OrderSchema);

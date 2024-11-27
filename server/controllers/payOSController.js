const PayOS = require("@payos/node");
const { Order } = require('../models/order');
const { Product } = require('../models/product');
const asyncHandler = require('express-async-handler');

const payOS = new PayOS(process.env.PAYOS_CLIENT_ID,process.env.PAYOS_API_KEY,process.env.PAYOS_CHECKSUM_ID);

const createPayment = asyncHandler(async (req, res) => {
    const { price, payOSCode } = req.body;

    const YOUR_DOMAIN = process.env.CLIENT_URL;
    ordCode = payOSCode;
    const body = {
      orderCode: ordCode,
      amount: price/1000,
      description: `don hang ${ordCode}`,
      // items: productList,
      returnUrl: `${YOUR_DOMAIN}/payment-success/${ordCode}`,
      cancelUrl: `${YOUR_DOMAIN}/payment-cancelled/${ordCode}`,
    };
  
    try {
      const paymentLinkResponse = await payOS.createPaymentLink(body);

      // res.redirect(paymentLinkResponse.checkoutUrl);
  
      res.json({url: paymentLinkResponse.checkoutUrl});
    } catch (error) {
      console.error(error);
      res.send("Something went error");
    }
});

const checkPaymentStatus = asyncHandler(async (req, res) => {
    const { orderCode } = req.params;
  
    try {
      const paymentStatusResponse = await payOS.getPaymentLinkInformation(orderCode);
      if (paymentStatusResponse) {
        const order = await Order.findOne({
          payOSOrderId: orderCode,
        });
        if (order) {
          order.paymentStatus = paymentStatusResponse.status;
          if (paymentStatusResponse.status === "CANCELLED") {
            order.status = "Cancelled";
            for (let item of order.productList) {
            const product = await Product.findById(item.productId);
            if (product) {
                product.stock += item.quantity;
                await product.save();
            }
          }
          }
          await order.save();
        }
      }
  
      res.json({
        success: paymentStatusResponse? true : false,
        paymentData: paymentStatusResponse? paymentStatusResponse : "Cannot get payment status",
      });
    } catch (error) {
      console.error(error);
      res.send("Something went error");
    }
});

const receiveHook = asyncHandler(async (req, res) => {
});

module.exports = { createPayment, receiveHook, checkPaymentStatus };
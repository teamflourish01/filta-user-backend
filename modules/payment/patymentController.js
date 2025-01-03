const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("./paymentSchema");
let instance = new Razorpay({
  key_id: "rzp_test_rMaoQVF8tWJMAb",
  key_secret: "1SXjhBrnlcTlmRAyaonEKGlO",
});
exports.createOrder = async (req, res) => {
  const { amount, currency } = req.body;
  try {
    console.log(amount, "amount");

    const order = await instance.orders.create({
      amount,
      currency,
    });
    res.json(order);
    console.log(order, "order");
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.verifyPayment = async (req, res) => {
  console.log(req.body, "body");

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  try {
    const generated_signature = crypto
      .createHmac("sha256", "1SXjhBrnlcTlmRAyaonEKGlO")
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // const isValidSignature = Razorpay.utils.verifyPaymentSignature({
    //     order_id: razorpay_order_id,
    //     payment_id: razorpay_payment_id,
    //     signature: razorpay_signature,
    // });
    console.log(generated_signature, "generated_signature");
    console.log(razorpay_signature, "razorpay_signature");

    if (generated_signature === razorpay_signature) {
      let data = await new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      await data.save();
      res.status(200).send({ msg: "Vetrified", data });
      console.log(data);
    } else {
      res.status(400).send("Payment Verification Failed");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

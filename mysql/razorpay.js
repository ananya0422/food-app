import express from 'express'
import Razorpay from 'razorpay'

const router = express.Router()

const razorpay = new Razorpay({
   key_id : 'rzp_test_3YfSa4Atxwia5O',
    key_secret: 'p9zZe6xtTzsZAc1mrUanEKPp',
});




router.post("/create-order", async (req, res) => {

  const {amount,name,email,contact} = req.body;
  const options = {
amount: amount,
currency:"INR",

receipt:"receipt",


    // amount: 50000, // 
    // currency: "INR",
    // receipt: "order_rcptid_11",
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({
       id: order.id,
      currency: order.currency,
      amount: order.amount,
      customer_name: name,
      customer_email: email,
      customer_contact: contact,
    });
  } catch (err) {
    res.status(500).json("Something went wrong" , err);
  }
});
export default router
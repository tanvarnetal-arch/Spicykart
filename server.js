import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import Razorpay from 'razorpay';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
app.use(express.json());
app.use(cors());

// Initialize razorpay object
const razorpay = new Razorpay({
  key_id: process.env.VITE_RAZORPAY_KEY_ID || 'dummy_api_key', 
  key_secret: process.env.RAZORPAY_SECRET_KEY || 'dummy_secret_key'
});

app.post('/api/create-order', async (req, res) => {
  try {
    const options = {
      amount: req.body.amount, // amount in paise
      currency: "INR",
      receipt: "receipt_order_" + Math.floor(Math.random() * 1000)
    };
    
    const order = await razorpay.orders.create(options);
    if (!order) return res.status(500).send("Some error occured");

    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send(error);
  }
});

app.post('/api/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY || 'dummy_secret_key')
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Razorpay Server started on port ${port}`));

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
router.post('/request', authMiddleware, async (req, res) => {
  const { items, address, phone } = req.body;

  if (!items || !address || !phone) {
    return res.status(400).json({ message: 'Items, address, and phone number are required.' });
  }

  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      subject: `New Recycling Pickup Request from ${user.name}`,
      text: `
Hi Recycling Team,

A new recycling pickup request has been submitted.

User Details:
- Email: ${user.email}

Recycling Request Details:
- Pickup Address: ${address}
- Items to Recycle: ${items}
- Phone number: ${phone}

Please arrange a pickup and contact the user if needed.

Thank you.
      `,
      replyTo: user.email,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Recycling request sent successfully.' });
  } catch (error) {
    console.error('Error sending recycling request:', error);
    res.status(500).json({ message: 'Failed to send recycling request.' });
  }
});


module.exports = router;

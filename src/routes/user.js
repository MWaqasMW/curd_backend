import express from 'express';
import CryptoJS from 'crypto-js';
import { registerValidation } from 'your-validation-module'; // Import your validation module

const router = express.Router();

// ... (previous routes and middleware)

router.patch('/update/:userId', async (req, res) => {
  try {
    const { image, name } = req.body;
    const userId = req.params.userId;

    // Check if the user exists
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Validate the name field (you can add more validation as needed)
    if (!name) {
      return res.status(400).send({ error: 'Name is required for update' });
    }

    // Update only the specified fields
    existingUser.name = name;
    if (image) {
      existingUser.image = image;
    }

    await existingUser.save();

    res.status(200).send({ message: 'User updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal Server Error', msg: err.message });
  }
});

export default router;

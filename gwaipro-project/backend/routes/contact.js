const express = require("express");
const router = express.Router();

let messages = []; // temporary storage

// POST contact form
router.post("/", (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newMessage = {
    id: Date.now(),
    firstName,
    lastName,
    email,
    message,
  };

  messages.push(newMessage);

  console.log("New contact message:", newMessage);

  res.status(200).json({ message: "Message received successfully" });
});

// GET all messages (for testing)
router.get("/", (req, res) => {
  res.json(messages);
});

module.exports = router;
const express = require("express");
const router = express.Router();

/* Local temporary storage */
let waitlist = [];

/* Simple email validation */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* POST - Add to waitlist */
router.post("/", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (waitlist.includes(email)) {
    return res.status(400).json({ message: "Email already exists" });
  }

  waitlist.push(email);

  console.log("Updated waitlist:", waitlist);

  res.status(201).json({ message: "Successfully added" });
});

/* GET - View all waitlist emails */
router.get("/", (req, res) => {
  res.json(waitlist);
});

module.exports = router;
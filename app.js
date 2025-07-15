const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Show registration form
app.get('/register', (req, res) => {
  res.render('register'); // No success flag needed
});

// Handle form submission
app.post('/register', (req, res) => {
  const {
    first_name,
    last_name,
    email,
    username,
    phone,
    gender,
    dob,
    address,
    password,
    confirm_password,
    terms
  } = req.body;

  // Validation
  if (password !== confirm_password) {
    return res.send("❌ Passwords do not match!");
  }
  if (!/^\d{10}$/.test(phone)) {
    return res.send("❌ Invalid phone number!");
  }

  console.log("✅ User Registered:");
  console.log({
    first_name,
    last_name,
    email,
    username,
    phone,
    gender,
    dob,
    address,
    password,
    confirm_password,
    terms
  });

  // Redirect to thank-you page
  res.redirect('/thank-you');
});

// Thank-you route
app.get('/thank-you', (req, res) => {
  res.render('thank-you'); // You need views/thank-you.ejs
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/register`);
});

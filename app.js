const express = require('express');
const app = express();
const web = require('./routes/web');
const connectDB = require('./db/connectDB');
const fileupload = require('express-fileupload');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Middleware
app.use(cookieParser());

// Allow JSON body parsing (must be BEFORE routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data

// CORS
app.use(
  cors({
    origin: "https://bookingsystem08.netlify.app", // your frontend
    credentials: true,
  })
);

// File upload
app.use(
  fileupload({
    useTempFiles: true,
  })
);

// Connect to database
connectDB();

// Routes
app.use('/api', web);

// Render sets PORT automatically
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

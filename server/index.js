const express = require("express");
const app = express();
const dotenv = require('dotenv')
const connectDB = require("./config/db");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const port = process.env.PORT || 8001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// const Candidate=require('./models/candidate')
// const Recruiter=require('./models/recruiter')
// const Jobs=require('./models/jobs')
// const Application=require('./models/applications')


//database connetion
dotenv.config();
connectDB();

//all the routes:
app.use("/admin",require("./routes/adminRoutes"));
app.use("/auth",require("./routes/authRoutes"));
app.use("/candidate",require("./routes/candidateRoutes"));
app.use("/recruiter",require("./routes/RecruiterRoutes"));

//application on this port.
app.listen(port, () => {
    console.log(
      `Node Server Running on Port ${port}`
    );
});
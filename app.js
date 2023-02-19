const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

// setting options for CORS 
var corsOptions = {
  origin: ["http://localhost:3000"],
  methods: "GET,PUT,PATCH,POST,DELETE"
}

const bodyparser = require("body-parser");
// api route
const api = require("./routes/api");
const app = express();

app.use(bodyparser.json());
app.use(cors(corsOptions));


const uri = process.env.MONGODB_URI;

//Connect to monodb atlas
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then(() => {
    console.log("connected to DB......");
  })
  .catch((err) => console.log(err));
mongoose.set("debug", true);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

app.use("/api", api);

app.get("/noted" , (req,res) => {
  res.status(200).send('welcome to noted');
});

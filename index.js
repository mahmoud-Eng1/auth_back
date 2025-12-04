require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("express-async-error");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const corsOptins = require("./config/optionsCors");
const authentcationRoute = require("./routes/authentcationRoute");
const usersRoute = require("./routes/userRoute");
const rootPage = require("./routes/root");
const path = require("path");


const app = express();
const port = 5000;
require("./config/dbConect");

// middlewere
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptins));
app.use(express.static(path.join(__dirname, "public")))

// routes
app.use("/", rootPage);
app.use("/", authentcationRoute);
app.use("/users", usersRoute);


app.all(/.*/, (req, res)=> {
  res.status(404);
  if(req.accepts("html")){
    res.sendFile(path.join(__dirname, "public", "notFound.html"));
  }else if(req.accepts("json")){
    res.send({ message: "page Not found"})
  } else{
    res.type("text").send("page Not found")
  }
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    status: statusCode,
    message: err?.message,
    errors: err?.errors || [],
  });
});


mongoose.connection.once("open", () => {
  console.log("db conected");
  app.listen(port, () => {
    console.log(`server worked at server ${port}`);
  });
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});

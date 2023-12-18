const bodyParser = require("body-parser");
const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv/config");
require("body-parser");
const morgan = require("morgan");
const ProductRouter = require("./routes/products.routes");
const UserRouter = require("./routes/users.routes");
const CategoryRouter = require("./routes/categories.routes");
const OrderRouter = require("./routes/orders.routes");
const cors = require("cors");
const authJwt = require("./configuration/jwt");
const errorHandler = require('./configuration/error-handler');
const path = require('path')

const API = process.env.ECOMMERCE_APP_URL;

const app = express();
app.use(cors());
app.options("*", cors());

app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);
// app.use('/public/uploads', express.static(path.join(__dirname, '/public/uploads')))
app.use('/public/uploads',express.static(__dirname+'/public/uploads'))

app.use(`${API}/products/`, ProductRouter);
app.use(`${API}/categories/`, CategoryRouter);
app.use(`${API}/users/`, UserRouter);
app.use(`${API}/orders/`, OrderRouter);

mongoose
  .connect(process.env.MONGODB_CNNECTION_STRING_LOCKED, {
    dbName: "e-commerce",
  })
  .then(() => {
    console.log("Database Ready");
  })
  .catch((e) => {
    console.log("Database Connection error" + e);
  });

app.listen(1019, () => {
  console.log("Server is Started here -s 1019");
});

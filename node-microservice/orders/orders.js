const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./order");
const axios = require("axios");

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/Orders", () => {
  console.log("database is connected");
});

const Order = mongoose.model("Order");

app.post("/order", (req, res) => {
  var newOrder = {
    CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
    BookID: mongoose.Types.ObjectId(req.body.BookID),
    initialDate: req.body.initialDate,
    deliveryDate: req.body.deliveryDate
  };
  var order = new Order(newOrder);
  order
    .save()
    .then(() => {
      console.log("New order is created");
      res.send(req.body);
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

app.get("/orders", (req, res) => {
  Order.find()
    .then(orders => {
      res.send(orders);
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

app.get("/order/:id", (req, res) => {
  Order.findById(req.params.id)
    .then(orders => {
      // console.log(orders)
      axios
        .get("http://localhost:4001/customer/" + orders.CustomerID)
        .then(response => {
        //   console.log(response);
          var orderObj = { CustomerName: response.data.name, bookTitle: "" };
          axios
            .get("http://localhost:4000/book/" + orders.BookID)
            .then(response => {
              orderObj.bookTitle = response.data.title;
            //   console.log(response);
              res.json(orderObj);
            });
        });
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

app.delete("/order/:id", (req, res) => {
  Order.findOneAndDelete(req.params.id)
    .then(orders => {
      res.send(orders);
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

app.listen(4002, () => {
  console.log("server is running on 4002");
});

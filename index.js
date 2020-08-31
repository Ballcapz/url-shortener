const express = require("express");
const bodyParser = require("body-parser");
const uuidBase62 = require("uuid-base62");
require("dotenv").config();

const SHORT_URL_BASE = process.env.SHORT_URL_BASE;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(process.env.MONGO_CONN_STR, {
  useUnifiedTopology: true,
}).then((client) => {
  console.log("connected to db");
  const db = client.db("UrlLookup");
  const urlsCollection = db.collection("urls");

  app.post("/shorten", (req, res) => {
    let id = uuidBase62.v4();
    const urlObject = {
      id,
      url: req.body.url,
    };
    let shortUrl = SHORT_URL_BASE;
    urlsCollection
      .insertOne(urlObject)
      .then((result) => {
        shortUrl += "/" + id;
        res.render("index.ejs", { shortened: shortUrl });
      })
      .catch((error) => console.error(error));
  });

  app.get("/", (req, res) => {
    res.render("index.ejs", { shortened: null });
  });

  app.get("/:uuid", (req, res) => {
    db.collection("urls")
      .findOne({ id: req.params.uuid.toString() })
      .then((result) => {
        res.redirect(result.url);
      });
  });
});

app.listen(3000, () => console.log("listening on 3000"));

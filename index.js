const express = require("express");
const router = require("express").Router();
const { byName, byYear } = require("us-baby-names-2");
const app = express();
const port = 3000;

app.use(function (req, res, next) {
    console.log("Additional processing is done here");
    req.timestamp = new Date().toString();
    next();
});

app.get("/", (req, res) => {
    res.append("Content-Type", "text/html");
    res.json(
        "<html><head></head><body>" +
            "<h1>Hello World!</h1>" +
            "<h3>My server is working!!!</h3>" +
            "<h5>" +
            req.timestamp +
            "</h5></body></html>"
    );
});

app.get("/bbt", (req, res) => {
    res.json("Big Bang Theory epesode information");
});

app.get("/bbt/episode", (req, res) => {
    res.json("BBT Episode List");
});

app.get("/bbt/episode/:num", (req, res) => {
    res.json("BBT Episode " + req.params.num);
});

// Transform the data object elements into an
// HTML table
const formatToHTML = function (dataArr) {
    // If dataArr is undefined or null, make an empty array
    if (!dataArr) {
        dataArr = [];
    }
    // Use the Array.map function to convert each record
    // into an HTML table element.
    dataArr = dataArr.map((item) => {
        // Create the HTML here
        let html = "<tr>";
        html += item.year ? "<td>" + item.year + "</td>" : "";
        html += item.name ? "<td>" + item.name + "</td>" : "";
        html += item.sex ? "<td>" + item.sex + "</td>" : "";
        html += item.count ? "<td>" + item.count + "</td>" : "";
        html += "</tr>";
        return html;
    });
    // Now join all the elements together inside the
    // <table><tbody> elements.
    return "<table><tbody>" + dataArr.join("") + "</tbody></table>";
};

// Transform name with first character capitalized and the
// rest lower case
const fixName = function (name) {
    let newName = name.toLowerCase();
    newName = newName.charAt(0).toUpperCase() + newName.substr(1);
    return newName;
};

const beautify = function (data) {
    return(`<html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f0f0f0;
          text-align: center;
        }
        .container {
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          max-width: 600px;
          margin: 0 auto;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>US Baby Names</h1>
        <p>Here is the data you requested:</p>
        ${data}
      </div>
    </body>
  </html>`);
}

app.get("/baby-name/:name", function (req, res) {
    let data = formatToHTML(byName[fixName(req.params.name)]);
    res.send(beautify(data));
});

// 404 Page Not Found
app.get("*", (req, res) => {
    // make a nice looking html page here that says that its a 404 error
    res.status(404).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>404 Not Found</title>
    </head>
    <body style="background-color: #333; font-family: Arial, sans-serif; text-align: center; margin: 0; padding: 0; color: #fff;">
      <div class="container" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #444; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);">
        <h1 style="color: #ff4500; font-size: 3rem;">404 Not Found</h1>
        <p style="font-size: 1.5rem;">Sorry, the page you are looking for doesn't exist.</p>
      </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

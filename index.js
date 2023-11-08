const express = require("express");
const { byName, byYear } = require("us-baby-names-2");
const app = express();
const port = 3000;

app.use(function (req, res, next) {
    console.log("--------------------------");
    console.log("Request received at " + "\x1b[36m" + new Date().toString() + "\x1b[0m for path " + "\x1b[32m" + req.path + "\x1b[0m");
    next();
});

app.get("/", (req, res) => {
    res.send(`<html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #333; /* Dark background color */
          color: #fff; /* Light text color */
          text-align: center;
        }
        .container {
          background-color: #444; /* Slightly lighter container background */
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          max-width: 600px;
          margin: 0 auto;
        }
        a {
          text-decoration: none;
          color: #fff;
        }
        a:hover {
          text-decoration: underline;
        }

      </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome to BabyNames Test and the Big Bang Theory API</h1>
            <p></p>
            <p>Timestamp: ${req.timestamp}</p>
            <a href="/bbt">Big Bang Theory Episode information</a></br>
            <a href="/baby-name/Tim">US Baby Names</a></br>
        </div>
    </body>
    </html>`);
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
        
        let htmlLine = "<tr>";
        htmlLine += item.year ? "<td>" + item.year + "</td>" : "<td></td>";
        htmlLine += item.name ? "<td>" + item.name + "</td>" : "<td></td>";
        htmlLine += item.sex ? "<td>" + item.sex + "</td>" : "<td></td>";
        htmlLine += item.count ? "<td>" + item.count + "</td>" : "<td></td>";
        htmlLine += "</tr>";
        return htmlLine;
    });
    // Now join all the elements together inside the
    // <table><tbody> elements.
    return "<table><tbody>"+ "<th>Year</th>"+ "<th>Name</th>" + "<th>Sex</th>"+ "<th>Count</th>" + dataArr.join("") + "</tbody></table>";
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
          background-color: #333; /* Dark background color */
          color: #fff; /* Light text color */
          text-align: center;
        }
        .container {
          background-color: #444; /* Slightly lighter container background */
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          max-width: 600px;
          margin: 0 auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          background-color: #555; /* Dark background for the table */
        }
        th, td {
          border: 1px solid #777; /* Slightly lighter border for cells */
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #333; /* Dark header background color */
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
    let data = (req.query.json == 'true' || req.query.json == 1) ? byName[fixName(req.params.name)] : beautify(formatToHTML(byName[fixName(req.params.name)]));
    res.send(data);
});

app.get("/baby-name/:name/:year", function (req, res) {
    let data = (req.query.json == 'true' || req.query.json == 1) ? byName[fixName(req.params.name)].filter((item) => item.year == req.params.year) : beautify(formatToHTML(byName[fixName(req.params.name)].filter((item) => item.year == req.params.year)));
    res.send(data);
});

app.get("/baby-name/:name/after/:year", function (req, res) {
    let data = (req.query.json == 'true' || req.query.json == 1) ? byName[fixName(req.params.name)].filter((item) => item.year > req.params.year) : beautify(formatToHTML(byName[fixName(req.params.name)].filter((item) => item.year > req.params.year))) ;
    res.send(data);
});

app.get("/baby-name/:name/before/:year", function (req, res) {
    let data = (req.query.json == 'true' || req.query.json == 1) ? byName[fixName(req.params.name)].filter((item) => item.year < req.params.year) : beautify(formatToHTML(byName[fixName(req.params.name)].filter((item) => item.year < req.params.year))) ;
    res.send(data);
});

app.get("/baby-year/:year", function (req, res) {
    let data = (req.query.json == 'true' || req.query.json == 1) ? byYear[req.params.year] : beautify(formatToHTML(byYear[req.params.year])) ;
    res.send(data);
});

app.get("/baby-year/:year/:name", function (req, res) {
    let data = (req.query.json == 'true' || req.query.json == 1) ? byYear[req.params.year].filter((item) => item.name == fixName(req.params.name)) : beautify(formatToHTML(byYear[req.params.year].filter((item) => item.name == fixName(req.params.name)))) ;
    res.send(data);
});

app.get("/baby-year-start/:year/:letter", function (req, res) {
    let data = (req.query.json == 'true' || req.query.json == 1) ? byYear[req.params.year].filter((item) => item.name.charAt(0) == req.params.letter) : beautify(formatToHTML(byYear[req.params.year].filter((item) => item.name.charAt(0) == req.params.letter))) ;
    res.send(data);
});

app.get("/baby-year-end/:year/:letter", function (req, res) {
    let data = (req.query.json == 'true' || req.query.json == 1) ? byYear[req.params.year].filter((item) => item.name.charAt(item.name.length - 1) == req.params.letter) : beautify(formatToHTML(byYear[req.params.year].filter((item) => item.name.charAt(item.name.length - 1) == req.params.letter))) ;
    res.send(data);
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

function rainbowConsoleLog(text) {
    const words = text.split(' '); // Split the text into words
    const colors = [31, 33, 32, 36, 34, 35]; // ANSI color codes for red, yellow, green, cyan, blue, magenta
    let output = '';
  
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const colorCode = colors[i % colors.length];
      output += `\x1b[${colorCode}m${word}\x1b[0m`; // Apply color to the word
      if (i < words.length - 1) {
        output += ' '; // Add a space between words
      }
    }
  
    console.log(output);
}

app.listen(port, () => {
    rainbowConsoleLog(`App listening at http://localhost:${port}`);
});

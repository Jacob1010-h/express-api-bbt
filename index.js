const express = require("express");
const functions = require("./functions.js");
const { byName, byYear } = require("us-baby-names-2");
const app = express();

const port = 3000;

app.use(function (req, res, next) {
    functions.logRequest(req, res, next);
    next();
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/pages/home.html");
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

// Include the body parser middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.post("/baby-name/submit", (req, res) => {
    const name = functions.fixName(req.body.inputName);
    const year = req.body.year;
    let beforeAfter = req.body.beforeAfter;

    let redirectURL = ``;

    if (year) {
        beforeAfter = beforeAfter.toLowerCase();
        if (beforeAfter == "before") {
            redirectURL = `${name}/before/${year}`;
        } else if (beforeAfter == "after") {
            redirectURL = `${name}/after/${year}`;
        } else {
            redirectURL = `${name}/${year}`;
        }
        if (req.body.json == "true") {
            redirectURL += `?json=true`;
        }
    } else {
        redirectURL = `${name}`;
    }

    // Redirect to the constructed URL
    res.redirect(redirectURL);
});

app.post("/baby-year/submit", (req, res) => {
    const year = req.body.inputYear;
    const name = functions.fixName(req.body.inputName);
    const startEnd = req.body.startEnd;
    
    let redirectURL = ``;

    if (name) {
        if (startEnd == "startLetter") {
            redirectURL = `../baby-year-start/${year}/${name.charAt(0)}`;
        } else if (startEnd == "endLetter") {
            redirectURL = `../baby-year-end/${year}/${name.charAt(
                name.length - 1
            )}`;
        } else {
            redirectURL = `${year}/${name}`;
        }
        if (req.body.json == "true") {
            redirectURL += `?json=true`;
        }
    } else {
        redirectURL = `${year}`;
    }

    // Redirect to the constructed URL
    res.redirect(redirectURL);
});

app.get("/baby-api", function (req, res) {
    res.redirect("/baby-api/search");
});

app.get("/baby-api/search", function (req, res) {
    // make a search bar here
    res.send(`
        <!DOCTYPE html>
        <html>
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
                input[type=text] {
                    width: 70%;
                    padding: 12px 20px;
                    margin: 8px 0;
                    box-sizing: border-box;
                }
                input[type=checkbox] {
                    width: 10%;
                    padding: 12px 20px;
                    margin: 8px 0;
                    box-sizing: border-box;
                }
                select {
                    width: 70%;
                    padding: 12px 20px;
                    margin: 8px 0;
                    box-sizing: border-box;
                }
                button {
                    width: 70%;
                    background-color: #4CAF50;
                    color: white;
                    padding: 14px 20px;
                    margin: 8px 0;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #45a049;
                }
                h1 {
                    font-size: 3rem;
                }
                .grid-container {
                    display: grid;
                    grid-column-start: 1;
                    grid-column-end: 2;
                    grid-row-template: auto;
                    background-color: #333;
                    padding: 10px;
                }

                </style>
        </head>
        <div class="grid-container">
        <body>
            <h1>US Baby Names by Name</h1>
            <form id="myForm" action="/baby-name/submit" method="post">

                <div class="grid-item">
                <label for="inputName">Enter a name:</label>
                </div>
                <div class="grid-item">
                <input type="text" id="inputName" name="inputName" required>
                </div>

                </br>
                
                <div class="grid-item">
                <label for="json">JSON</label>
                </div>
                <div class="grid-item">
                <input type="checkbox" id="json" name="json" value="true">
                </div>

                </br>
                
                <div class="grid-item">
                <label for ="year">Year</label>
                </div>
                <div class="grid-item">
                <input type="text" id="year" name="year">
                </div>

                </br>
                <div class="grid-item">
                <label for ="beforeAfter">Before/After Year</label>
                </div>
                <div class="grid-item">
                <select name="beforeAfter" id="beforeAfter">
                <option value="none">None</option>
                    <option value="before">Before</option>
                    <option value="after">After</option>
                </select>
                <button type="submit">Submit</button>
                </div>
            </form>  
            
            <h1>US Baby Names by Year</h1>
            <form id="myForm" action="/baby-year/submit" method="post">
                <div class="grid-item">
                <label for="inputYear">Enter a year:</label>
                </div>

                <div class="grid-item">
                <input type="text" id="inputYear" name="inputYear" required>
                </div>

                </br>

                <div class="grid-item">
                <label for="json">JSON</label>
                </div>
                <div class="grid-item">
                <input type="checkbox" id="json" name="json" value="true">
                </div>
                </br>
                
                <div class="grid-item">
                <label for ="inputName">Name</label>
                </div>
                <div class="grid-item">
                <input type="text" id="inputName" name="inputName">
                </div>
                
                </br>
                <div class="grid-item">
                <label for ="startEnd">Start/End Letter</label>
                </div>
                <div class="grid-item">
                <select name="startEnd" id="startEnd" required>
                    <option value="none">None</option>
                    <option value="startLetter">Start Letter</option>
                    <option value="endLetter">End Letter</option>
                </select>
                <button type="submit">Submit</button>
                </div>
            </form>
        </body>
        </div>
        </html>
    `);
});

app.get("/baby-name/:name", function (req, res) {
    let data = byName[functions.fixName(req.params.name)];
    
    res.send(
        functions.dataAndfilteredDataExists(req, res, data)
    );
});

app.get("/baby-name/:name/:year", function (req, res) {
    let data = byName[functions.fixName(req.params.name)];
    
    res.send(
        functions.dataAndfilteredDataExists(req, res, data, (item) => {
            return item.year == req.params.year;
        })
    );
});

app.get("/baby-name/:name/after/:year", function (req, res) {
    let data = byName[functions.fixName(req.params.name)];
    
    res.send(
        functions.dataAndfilteredDataExists(req, res, data, (item) => {
            return item.year > req.params.year;
        })
    );
});

app.get("/baby-name/:name/before/:year", function (req, res) {
    let data = byName[functions.fixName(req.params.name)];
    
    res.send(
        functions.dataAndfilteredDataExists(req, res, data, (item) => {
            return item.year < req.params.year;
        })
    );
});

app.get("/baby-year/:year", function (req, res) {
    let data = byYear[req.params.year];
    
    res.send(
        functions.dataAndfilteredDataExists(req, res, data)
    );
});

app.get("/baby-year/:year/:name", function (req, res) {
    let data = byYear[req.params.year];
    
    res.send(
        functions.dataAndfilteredDataExists(req, res, data, (item) => {
            return item.name == req.params.name;
        })
    );
});

app.get("/baby-year-start/:year/:letter", function (req, res) {
    let data = byYear[req.params.year];
    
    res.send(
        functions.dataAndfilteredDataExists(req, res, data, (item) => {
            return item.name.charAt(0) == req.params.letter;
        })
    );
});

app.get("/baby-year-end/:year/:letter", function (req, res) {
    let data = byYear[req.params.year];

    res.send(
        functions.dataAndfilteredDataExists(req, res, data, (item) => {
            return item.name.charAt(item.name.length - 1) == req.params.letter;
        })
    );
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
    functions.rainbowConsoleLog(`App listening at http://localhost:${port}`);
});

module.exports = app;
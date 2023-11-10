const fs = require("mz/fs");

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
    return (
        "<table><tbody>" +
        "<th>Year</th>" +
        "<th>Name</th>" +
        "<th>Sex</th>" +
        "<th>Count</th>" +
        dataArr.join("") +
        "</tbody></table>"
    );
};

// beautify function that takes in data and res and transforms it into a html page
const beautify = function (data, res) {
    return `<html>
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
            th,
            td {
                border: 1px solid #777; /* Slightly lighter border for cells */
                padding: 8px;
                text-align: left;
            }
            th {
                background-color: #333; /* Dark header background color */
            }
            tr:nth-child(even) {
                background-color: #222; /* Darker background color for odd rows */
            }
            a {
                text-decoration: none;
                color: #fff;
            }
            a:hover {
                text-decoration: underline;
            }
            a:visited {
                color: #d1d1d1;
            }
        </style>
    </head>
    <body>
        <div class="container" id="beautiful">
            <h1>US Baby Names</h1>
            <h3>Go Back To Search Page</h3>
            <a href="/baby-api/search">Go Back</a>

            <p>Here is the data you requested: ${data}</p>
        </div>
    </body>
</html>
`
};

// exported functions -->>

// Transform name with first character capitalized and the
// rest lower case
const fixName = function (name) {
    let newName = name.toLowerCase();
    newName = newName.charAt(0).toUpperCase() + newName.substr(1);
    return newName;
};

function dataAndfilteredDataExists(req, res, data, filter = undefined) {
    let endData = data;

    // if the data is undefined or empty, write a 404 error
    if (endData == undefined || endData.length == 0) {
        res.status(404).send(`404 Not Found...Go back to home page
            <a href="/baby-api/search">Go Back</a>`);
    } else {
        // if the filter is undefined, we are not filtering the data,
        // so we can just write the data as is
        if (filter == undefined) {
            if (req.query.json == "true" || req.query.json == 1) {
            } else {
                endData = beautify(formatToHTML(endData), res);
            }
        } else {
            filteredData = endData.filter(filter);
            // if the filteredData is undefined or empty, write a 404 error
            if (filteredData == undefined || filteredData.length == 0) {
                res.status(404).send(`404 Not Found...Go back to home page
                <a href="/baby-api/search">Go Back</a>`);
            } else {
                if (req.query.json == "true" || req.query.json == 1) {
                } else {
                    endData = beautify(formatToHTML(filteredData), res);
                }
            }
        }
    }
    return endData;
}

function rainbowConsoleLog(text) {
    const words = text.split(" "); // Split the text into words
    const colors = [31, 33, 32, 36, 34, 35]; // ANSI color codes for red, yellow, green, cyan, blue, magenta
    let output = "";

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const colorCode = colors[i % colors.length];
        output += `\x1b[${colorCode}m${word}\x1b[0m`; // Apply color to the word
        if (i < words.length - 1) {
            output += " "; // Add a space between words
        }
    }

    console.log(output);
}

function logRequest(req, res, next) {
    var msg = 
    "--------------------------" +
    "\n" +
    "Request received at " +
    "\x1b[36m" +
    new Date() +
    "\x1b[0m for path " +
    "\x1b[32m" +
    req.path +
    "\x1b[0m";

    console.log(msg);
}

module.exports = {
    fixName,
    dataAndfilteredDataExists,
    rainbowConsoleLog,
    logRequest,
    formatToHTML,
    beautify,
};
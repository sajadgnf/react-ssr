const express = require("express");
const fs = require("fs");
const path = require("path");
const React = require("react");
const App = require("../src/App").default;
const ReactDOMServer = require("react-dom/server");

const server = express();

server.use("/static", express.static("public/static"));

server.get("/*", (req, res) => {
  const context = {};
  const app = ReactDOMServer.renderToString(<App />);

  const indexFile = path.resolve("public/index.html");
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading index.html", err);
      return res.status(500).send("Error reading index.html");
    }

    const updatedHTML = data.replace('<div id="root"></div>', `<div id="root">${app}</div>`);
    res.send(updatedHTML);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

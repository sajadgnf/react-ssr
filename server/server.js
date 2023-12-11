const React = require("react");
const App = require("../src/App");
const express = require("express");
const ReactDOMServer = require("react-dom/server");
const { StaticRouter } = require("react-router-dom");

const server = express();

server.use("/static", express.static("public/static"));

server.get("/*", (req, res) => {
  const context = {};
  const app = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  // Log the context for debugging
  console.log("SSR context:", context);

res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>SSR React App</title>
    </head>
    <body>
      <div id="root">${app}</div>
      <script src="/static/js/bundle.js"></script>
    </body>
  </html>
`);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

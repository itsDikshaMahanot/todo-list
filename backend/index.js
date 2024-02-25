const serverPort = 8080;

const http = require("http");

// Create a server object

const server = http.createServer(function (req, res) {
  res.write("<h1>Hello World!</h1>");
  // Write a response to the client

  res.end();

  // End the response
});

// Start the server and listen on the specified port

server.listen(serverPort, function () {
  console.log(`Server running on localhost:${serverPort}`);
});

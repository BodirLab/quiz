const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  const query = url.parse(req.url, true).query;
  console.log(req, query)
  // const message = request.getParameter('message')
  const message = query.message || 'du arsch' ;
  res.end( `Hello World, ${message}` );
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
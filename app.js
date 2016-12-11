const http = require("http"),
      httpProxy = require("http-proxy");

const MESSAGE = "пришел запрос";

const proxy = httpProxy.createProxyServer({});

// сервер А
http.createServer((req, res) => {
    res.end("It's Server A");
    console.log("SERVER_A:%s", MESSAGE);
}).listen(8000);

console.log("SERVER_A: OK!");

// сервер B
http.createServer((req, res) => {
    res.end("It's Server B");
    console.log("SERVER_B:%s", MESSAGE);
}).listen(9000);

console.log("SERVER_B: OK!");

// создание прокси сервера слушающего запросы
http.createServer((req, res) => {
    var url = req.url;
    if (req.url === "/a") {
       proxy.web(req, res, { target: 'http://localhost:8000' });
    } else {
        proxy.web(req, res, { target: 'http://localhost:9000' });
    }
}).listen(8080);

console.log("PROXY_SERVER: OK!");


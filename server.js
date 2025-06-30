const http = require("node:http");

const server = http.createServer(function (req,res) {
  if (req.url === "/s") {
    res.end("There is no secret data");
   
  }

  res.end("Hello World");
});

server.listen(7777);











// const  http=require("node:http");
// const server=http.createServer(function(req,res){
//     res.end("Hellow World");

// })

// server.listen(7777)



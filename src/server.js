const express = require("express")
const server = express()

//Configuração da pasta Public

server.use(express.static("public"))

//Ultilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    noCache: true
})
//Configura o caminho da aplicação

//Pagina inicial

server.get("/",(req, res) =>{
  return  res.render("index.html")
})
//Create-Point
server.get("/create-point", (req, res) =>{
    res.render("create-point.html")
})
//Search-Result
server.get("/search", (req, res) =>{
  res.render("search-results.html")
})

//Porta do servidor
server.listen(5000)
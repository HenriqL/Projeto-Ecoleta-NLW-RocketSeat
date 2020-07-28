const express = require("express")
const server = express()
//Pegar o banco de dados
const db = require("./database/db")

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

  //consulta os dados

db.all(`SELECT * FROM places`, function(err, rows){
        if(err){
            return console.log(err)
        }console.log("Aqui estão seus registros")
        console.log(rows)
    })

  res.render("search-results.html")
})

//Porta do servidor
server.listen(3000)
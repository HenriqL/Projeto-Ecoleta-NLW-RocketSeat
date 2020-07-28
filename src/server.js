const express = require("express")
const server = express()
//Pegar o banco de dados
const db = require("./database/db")

//Configuração da pasta Public

server.use(express.static("public"))
//habilita o uso do req.body na aplicação

server.use(express.urlencoded({extended: true}))

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
  //Query strings da URL 
  // console.log(req.query)


    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) =>{
  console.log(req.body)

  return res.send("ok")
})

//Search-Result
server.get("/search", (req, res) =>{

  //consulta os dados

db.all(`SELECT * FROM places`, function(err, rows){
        if(err){
            return console.log(err)
        }
        const total = rows.length

        //Mostra a pagina HTML com os dandos do Banco de dados
        return res.render("search-results.html", { places: rows, total:total})
    })
})

//Porta do servidor
server.listen(3000)
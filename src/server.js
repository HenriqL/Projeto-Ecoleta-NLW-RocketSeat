const express = require("express")
const server = express()

//Configuração da pasta Public

server.use(express.static("public"))

//Configura o caminho da aplicação

//Pagina inicial

server.get("/",(req, res) =>{
    res.sendFile(__dirname + "/views/index.html")
})
//Create-Point
server.get("/create-point", (req, res) =>{
    res.sendFile(__dirname + "/views/create-point.html")
})
//Search-Result
server.get("/search-results", (req, res) =>{
    res.sendFile(__dirname + "/views/search-results.html")
})

//Porta do servidor
server.listen(5000)
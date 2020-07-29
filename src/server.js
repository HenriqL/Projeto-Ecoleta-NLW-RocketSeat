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


    return res.render("create-point.html", {saved:true})
})

server.post("/savepoint", (req, res) =>{
  // console.log(req.body)
  //inserir os dados na tabela 

  const query = `
               INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
             ) VALUES (?, ?, ?, ?, ?, ?, ?); 
              `
  
      const values = [
          req.body.image,
          req.body.name,
          req.body.address,
          req.body.adress2,
          req.body.state,
          req.body.city,
          req.body.items
      ]
  
      function afterInsertData(err){
          if(err){
              return console.log(err)
          }
          console.log("Cadastrado com sucesso")
          console.log(this)
          return res.render("create-point.html", { saved: true})
      }
  
      db.run(query, values, afterInsertData)



  
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
//Importar a dependencia do Sqlite3
const sqlite3 = require("sqlite3").verbose()
//Cria o objeto que vai fazer operações nos bancos de dados
 const db = new sqlite3.Database("./src/database/database.db")

//Ultilza o objto de Banco de dados para as operações
db.serialize(() => {
    //cria a tabela com comandos SQL
    db.run(`
            CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                image TEXT,
                name TEXT,
                address TEXT,
                address2 TEXT,
                state TEXT,
                city TEXT,
                items TEXT
            );
    `)
    //inserir dados 
    // O VALUE fica como interroção, pois não sabemos o valor que vai ser inserido
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
        "https://images.unsplash.com/photo-1574689049377-2d1c02921490?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        "Colectoria",
        "Guilherme Gemballa, Jardin América",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
    }

    db.run(query, values, afterInsertData)
    //consulta os dados

    //deleta os dados da tabela
})
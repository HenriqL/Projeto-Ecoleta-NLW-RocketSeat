//Importar a dependencia do Sqlite3
const sqlite3 = require("sqlite3").verbose()
//Cria o objeto que vai fazer operações nos bancos de dados
 const db = new sqlite3.Database("./src/database/database.db")

//Ultilza o objto de Banco de dados para as operações
db.serialize( ()=>{
    //cria a tabela com comandos SQL
    db.rum(`
            CREATE TABLE IF NO EXISTS places (
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
    db.rum(`
            INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
            ) VALUES (?, ?, ?, ?, ?, ?, ?); 
        `)
    //consulta os dados

    //deleta os dados da tabela
})
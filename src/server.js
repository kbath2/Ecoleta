const express = require("express")
const server = express()
const db = require("./database/db")

// configuração da pasta publica
server.use(express.static("public"))
    // habilitar o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }))

// Configuração da template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Rotas 
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {



    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    const query = `
            INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
            ) VALUES (?,?,?,?,?,?,?);
            return res.send("ok")
        })`

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)
})

server.get("/search", (req, res) => {

    db.all(`
            SELECT * FROM places `, function(err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length

        return res.render("search-results.html", { places: rows, total: total })

    })


})


//Ligar o servidor
server.listen(3000, () => {
    console.log("Servidor Ok");
})
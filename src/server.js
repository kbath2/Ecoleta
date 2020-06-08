const express = require("express")
const server = express()

// configuração da pasta publica
server.use(express.static("public"))

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

server.get("/search", (req, res) => {
    return res.render("search-results.html")
})


//Ligar o servidor
server.listen(3000, () => {
    console.log("Servidor Ok");
})
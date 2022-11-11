const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let porta = 8081;
app.listen(porta, () => {
    console.log("Servidor iniciado na porta " + porta);
});

const Vaga = require('./model/vaga');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/";
const dataBaseDB = "MinhaLOjaDB";
const collectionDB = "vaga";
let db = null;

MongoClient.connect(uri, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        console.log('Erro ao conectar no banco de dados ' + dataBaseDB + '!');
        throw error;
    }
    db = client.db(dataBaseDB).collection(collectionDB);
    console.log('Conectado a base de dados: ' + dataBaseDB + '!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Retorna todas as vagas 
app.get('/Vaga', (req, res, next) => {
    db.find({}).toArray((err, result) => {
        if (err) return console.log("Error: " + err);
        res.send(result);
    });
});

// Retorna uma vaga associada a um numero
app.get('/Vaga/:numero', (req, res, next) => {
    const result = db.findOne({ "numero": req.params.numero }, (err, result) => {
    if (err) return console.log("Vaga não encontrada")
    res.send(result);
    });
});

// Cria uma nova vaga 
app.post('/Vaga', (req, res, next) => {
    var vaga = new Vaga({
        "numero": req.body.numero,
        "coordenadas,": req.body.coordenadas,
        "local": req.body.local
     });
    db.insertOne(vaga, (err, result) => {
        if (err) return console.log("Error: " + err);
        console.log('Vaga cadastrada com sucesso no BD!');
        res.send('Vaga cadastrada com sucesso no BD!');
    });
});

// Atualiza as coordenadas e local da vaga
app.put('/Vaga/:numero', (req, res, next) => {
    db.updateOne({"numero": req.params.numero }, {
        $set: {
            "coordenadas": req.body.coordenadas,
            "local": req.body.local
        }
    }, (err, result) => {
        if (err) return console.log("Error: " + err);
        console.log('Vaga atualizada com sucesso no BD!');
        res.send('Vaga atualizada com sucesso no BD!');
    });
});

// Remove a vaga
app.delete('/Vaga/:numero', (req, res, next) => {
    db.deleteOne({numero: req.params.numero },(err, result) => {
        if (err) return console.log("Error: " + err);
        console.log('Vaga removida do BD!');
        res.send('Vaga removida do BD!');
    });
});
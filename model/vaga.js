const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VagaSchema = new Schema({
    numero: {
        type: Number, 
        required: [true, 'Número da vaga Obrigatório']},
    coordenadas: {
        type: Array, 
        required: [true, 'Coordenadas Obrigatório']},
    local: {
        type: String,
        required: [true, 'Endereço obrigatório']
    }
});

// Exportar o modelo
module.exports = mongoose.model('vaga', VagaSchema);
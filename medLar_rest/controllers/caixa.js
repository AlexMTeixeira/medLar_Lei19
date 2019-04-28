var Utente = require('./ModelConnections').utente;
var Caixa = require('./ModelConnections').caixa;
var Medicamento = require('./ModelConnections').medicamento;

module.exports.listaMedicamentosUtente= async function(idUtente){
    var result = [];
    await Caixa.findAll(
        {where: {utente: idUtente}, include: [Medicamento]}
    ).then(values => {
        for(i in values)
          result.push(values[i].dataValues);
    }).catch(err => {
        console.log("Erro listar medicamentos -> "+ err);
    });
    return result;
};
var Medicamento = require('./ModelConnections').medicamento;
var db = require('./ModelConnections').db;

module.exports.getAllMedicamentos = async function() {
    var result = [];
    await Medicamento.findAll().then(values => {
        for(i in values)
          result.push(values[i].dataValues);
      }).catch(err => {
        result = err;
      });
      return result;
};

module.exports.getMedicamentoById = async (id) => {
    var result;
    await Medicamento.findOne({
      where: {
        id_med: id
      }
    }).then(values => {
        result = values.dataValues;
    }).catch(err => {
        result = err
    });
    return result
};

module.exports.updatePrecoById = async function(id, preco){
    var result;
    await Medicamento.update(
      { preco: preco},
      { where: { id_med: id } }
    )
      .then(()=> result = {message: "Medicamento "+id+" com preço alterado para "+preco+"!"})
      .catch(err=> result = err)
    return result;
}

module.exports.addMedicamento = async function(id,nome,preco,lab,uni_emb,
formato,dosagem,quantidade){
    var result;
    await Medicamento.create({
        id_med: id,
        nome: nome,
        preco: preco,
        lab: lab, 
        uni_emb: uni_emb, 
        formato: formato, 
        dosagem: dosagem,
        quantidade: quantidade
    }).then(() => Medicamento.findOrCreate({
            where: {
            id_med: id
            }})).then(([ax, created]) => {
                result = ax;
    }).catch(err => {
        result = err
    });
    return result;
  }

  module.exports.addQuantidadeById = async function(id,qt){
    Medicamento.update(
      { quantidade: db.literal('quantidade +'+ qt)},
      { where: { id_med: id } }
    )
      .then(result =>
        console.log(result)
      )
      .catch(err =>
        console.log(err)
      )
  }

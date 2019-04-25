var Medicamento = require('./ModelConnections').medicamento;

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

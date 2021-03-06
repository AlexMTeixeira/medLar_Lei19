var Auxiliar = require('./ModelConnections').auxiliar;
var bcrypt = require('bcryptjs');

module.exports.getAllAuxiliares = async function(){
  var result = [];
  await Auxiliar.findAll().then(values => {
    for(aux in values)
      result.push(values[aux].dataValues);
  }).catch(err => {
    result = err;
  });
  return result;
};

module.exports.getAuxiliaresByEstado = async function(estado){
  var result = [];
  await Auxiliar.findAll({
      where: {
        estado: estado
    }}).then(values => {
        for(aux in values)
          result.push(values[aux].dataValues);
    }).catch(err => {
      result = err;
  });
  return result;
};  

module.exports.addAuxiliar = async function(password,contacto,nome,apelido,
  data_nascimento,rua,localidade,codigo_postal,cidade,estado){
    
  var hash = await bcrypt.hash(password, 10);

  var result;

  await Auxiliar.create({
    password: hash,
    contacto: contacto,
    nome: nome, 
    apelido: apelido, 
    data_nascimento: data_nascimento, 
    rua: rua, 
    localidade: localidade,
    codigo_postal: codigo_postal, 
    cidade: cidade, 
    estado: estado
  }).then(() => Auxiliar.findOrCreate({
        where: {
          id: id
        }})).then(([ax, created]) => {
            result = ax;
  }).catch(err => {
    result = err
  });
  return result;
}

module.exports.mudarEstadoAuxiliarById = async function(id, estado){
  var result;
  await Auxiliar.update(
    { estado: estado},
    { where: { id: id } }
  )
    .then(()=>{
      result = Auxiliar.findOne({where: {id: id}})
    })
    .catch(err=> result = err)
  return result;
}

module.exports.getAuxiliarById = async (id) => {
  var result;
  await Auxiliar.findOne({
    where: {
      id: id
    }
  }).then(values => {
      result = values.dataValues;
  }).catch(err => {
      result = err
  });
  return result
};

module.exports.validatePassword = async (id, password) => {
  var auxiliar = await this.getAuxiliarById(id)
  
  if(!auxiliar) 
      throw new Error("Utilizador não encontrado!")

  var compare = await bcrypt.compare(password, auxiliar.password)
  
  if(!compare)
      throw new Error ("Invalid password")
  
  return auxiliar
}

module.exports.updateAuxiliar = async function(np, nome,apelido, password, data_nascimento, contacto, rua, localidade, codigo_postal, cidade, estado){
  var result;

  if(password!==''){
    var hash = await bcrypt.hash(password, 10);

    await Auxiliar.update({
      nome: nome, 
      apelido: apelido, 
      password: hash,
      data_nascimento: data_nascimento, 
      contacto: contacto,
      rua: rua, 
      localidade: localidade,
      codigo_postal: codigo_postal, 
      cidade: cidade, 
      estado: estado},{
        where: {id: np}
      })
      .then(()=> {
        result = Auxiliar.findOne({where: {id: np}})
      })
      .catch(err=> result = err)
    }
    else{
      await Auxiliar.update({
        nome: nome, 
        apelido: apelido, 
        data_nascimento: data_nascimento, 
        contacto: contacto,
        rua: rua, 
        localidade: localidade,
        codigo_postal: codigo_postal, 
        cidade: cidade, 
        estado: estado},{
          where: {id: np}
        })
        .then(()=> {
          result = Auxiliar.findOne({where: {id: np}})
        })
        .catch(err=> result = err)
    }
  return result;
}
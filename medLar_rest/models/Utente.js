/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Utente', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    data_Nascimento: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    genero: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    contacto: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    nome_Encarregado: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    grau: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    contacto_Encarregado: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    rua: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    localidade: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    cod_Postal: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    ativo: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    }
  }, {
    tableName: 'Utente'
  });
};

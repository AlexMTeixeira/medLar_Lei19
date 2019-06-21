import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ListView,
  FlatList,
  ActivityIndicator, 
  ScrollView,
  Image
} from "react-native";
import { Text, Divider,CheckBox, SearchBar, Input , ListItem } from 'react-native-elements'
import axios from "axios";
import DatePicker from 'react-native-datepicker'
import { FloatingAction } from "react-native-floating-action";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  scene:{
    flex: 1,
    paddingTop: 25,
  }
});
const guardar = [
  {
    text: "Guardar",
    name: "save",
    icon: require("../assets/images/save.png"),
    position: 1
  }
];
const remover = [
  {
    text: "Remover",
    name: "delete",
    icon: require("../assets/images/delete.png"),
    position: 1
  }
];

class UtenteEditScreen extends Component {
  static navigationOptions = {
    title: 'Info. Utente',
  };
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      nr_processo: this.props.navigation.state.params.nr_processo,
      nome: '',
      apelido: '',
      genero: '',
      data_nascimento: '',
      contacto: '',
      encarregado: '',
      parentesco: '',
      contacto_enc: '',
      rua: '',
      localidade: '',
      codigo_postal: '',
      cidade: '',
      estado: '',
      error: null,
      checked: false,
      date:"2016-05-15"
    }
    this.getUtente = this.getUtente.bind(this);
  }

  updateSearch = (e) => {
    if(e==='') 
      this.setState({utentes: this.state.utentesOriginal,search: ''})
    else {const newData = this.state.utentesOriginal.filter(o => {
      return Object.keys(o).some(k => JSON.stringify(o[k]).toLowerCase().includes(e.toLowerCase()));
    });
    this.setState({utentes: newData, search: e});
    }
  };

  updateUtente = () => {
    axios.post("http://192.168.1.7:8000/api/utentes/update",{
      nr_processo: this.state.nr_processo,
      nome: this.state.nome,
      apelido: this.state.apelido,
      genero: this.state.genero,
      data_nascimento: this.state.data_nascimento,
      contacto: this.state.contacto,
      encarregado: this.state.encarregado,
      parentesco: this.state.parentesco,
      contacto_enc: this.state.contacto_enc,
      rua: this.state.rua,
      localidade: this.state.localidade,
      codigo_postal: this.state.codigo_postal,
      cidade: this.state.cidade,
      estado: this.state.estado
    })
      .then(() =>{
                    alert("Utente alterado com sucesso")
                    this.props.navigation.push("UtentesDashNavigator")
                  })
      .catch(() => alert("Erro na alteração de Utente"))
  }

  getUtente = (nr) =>{
    axios.get("http://192.168.1.7:8000/api/utentes/"+nr)
      .then(res => {
        if(res.data.genero==='M')
          this.setState({checked: true})
        
        this.setState({
            nome: res.data.nome,
            apelido: res.data.apelido,
            genero: res.data.genero,
            data_nascimento: res.data.data_nascimento,
            contacto: res.data.contacto,
            encarregado: res.data.encarregado,
            parentesco: res.data.parentesco,
            contacto_enc: res.data.contacto_enc,
            rua: res.data.rua,
            localidade: res.data.localidade,
            codigo_postal: res.data.codigo_postal,
            cidade: res.data.cidade,
            estado: res.data.estado
        })
      })
      .catch(error => this.setState({error: error}))
  }

  closeUtente = () => {
    axios.get("http://192.168.1.7:8000/api/utentes/desativar/"+this.state.nr_processo)
        .then(() => {
          alert("Utente desativado")
          this.props.navigation.push("UtentesDashNavigator")
        })
        .catch(() => alert("Erro na destivação de Utente"))
  }

  changeName = (e) => {
    this.setState({nome: e})
  }

  componentDidMount() {
    this.getUtente(this.state.nr_processo)
  }
  render () {
    
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        margin: 10,
      }}>
        <Text h3>Utente</Text>
        <View style={{flexDirection: 'row'}}>
          {
            this.state.genero === 'M' 
              ?   <Image
                    style={{width: 100, height: 100}}
                    source={require('../assets/images/maleIcon.png')}
                  />
              :   <Image
                    style={{width: 100, height: 100}}
                    source={require('../assets/images/femaleIcon.png')}
                  />
          }
          <View style={{flexDirection: 'column', display: 'flex'}}>
            <View style={{flexDirection: 'row', display: 'flex'}}>
              <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>Nome: </Text>
              <Input
                style={{marginRight: 20}}
                placeholder="Escreva aqui ..."
                value={this.state.nome}
                onChangeText={(val) => {this.setState({nome: val})}}
              />
            </View>
            <View style={{flexDirection: 'row', display: 'flex'}}>
              <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>Apelido: </Text>
              <Input
                style={{marginRight: 20}}
                placeholder="Escreva aqui ..."
                value={this.state.apelido}
                onChangeText={(val) => {this.setState({apelido: val})}}
              />
            </View>
          </View>
        </View>
        
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
          <Text style={{fontSize: 20,fontWeight: '300'}}>Género</Text>
          <Text style={{fontSize: 20,fontWeight: '300'}}>Data Nascimento</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View style={{flexDirection: 'row'}}>
            <CheckBox
              round
              title='M'
              checked={this.state.checked}
              checkedColor='orange'
              onPress={() => this.setState({checked: !this.state.checked, genero: 'M'})}
            />
            <CheckBox
              round
              title='F'
              checked={!this.state.checked}
              checkedColor='orange'
              onPress={() => this.setState({checked: !this.state.checked, genero: 'F'})}
            />
          </View>
          <View style={{marginTop: 7}}><DatePicker
            style={{width: 200}}
            date={this.state.data_nascimento}
            mode="date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            onPressDate
            onDateChange={(date) => {this.setState({data_nascimento: date})}}
          /></View>
        </View>
        <Text h4>Contacto</Text>
        <View style={{flexDirection: 'row', display: 'flex'}}>
          <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>
            Nº de Telemovel: 
          </Text>
          <Input
            placeholder="Escreva aqui ..."
            value={this.state.contacto}
            onChangeText={(val) => {this.setState({contacto: val})}}
          />
        </View>
        <View style={{flexDirection: 'row', display: 'flex'}}>
          <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>
            Encarregado: 
          </Text>
          <Input
            placeholder="Escreva aqui ..."
            value={this.state.encarregado}
            onChangeText={(val) => {this.setState({encarregado: val})}}
          />
        </View>
        <View style={{flexDirection: 'row', display: 'flex'}}>
          <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>
            Parentesco: 
          </Text>
          <Input
            placeholder="Escreva aqui ..."
            value={this.state.parentesco}
            onChangeText={(val) => {this.setState({parentesco: val})}}
          />
        </View>
        <View style={{flexDirection: 'row', display: 'flex'}}>
          <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>
            Telemovel Enc.: 
          </Text>
          <Input
            placeholder="Escreva aqui ..."
            value={this.state.contacto_enc}
            onChangeText={(val) => {this.setState({contacto_enc: val})}}
          />
        </View>
        <View style={{flexDirection: 'row', display: 'flex'}}>
          <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>
            Rua: 
          </Text>
          <Input
            placeholder="Escreva aqui ..."
            value={this.state.rua}
            onChangeText={(val) => {this.setState({rua: val})}}
          />
        </View>
        <View style={{flexDirection: 'row', display: 'flex'}}>
          <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>
            Localidade: 
          </Text>
          <Input
            placeholder="Escreva aqui ..."
            value={this.state.localidade}
            onChangeText={(val) => {this.setState({localidade: val})}}
          />
        </View>
        <View style={{flexDirection: 'row', display: 'flex'}}>
          <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>
            Código Postal: 
          </Text>
          <Input
            placeholder="Escreva aqui ..."
            value={this.state.codigo_postal}
            onChangeText={(val) => {this.setState({codigo_postal: val})}}
          />
        </View>
        <View style={{flexDirection: 'row', display: 'flex'}}>
          <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>
            Cidade: 
          </Text>
          <Input
            placeholder="Escreva aqui ..."
            value={this.state.cidade}
            onChangeText={(val) => {this.setState({cidade: val})}}
          />
        </View>
        <FloatingAction
          actions={guardar}
          color='orange'
          overrideWithAction
          onPressItem={name => {
            if(name==="save")
              this.updateUtente()
          }}
        />
        <FloatingAction
          position="left"
          actions={remover}
          color='red'
          overrideWithAction
          onPressItem={name => {
            if(name==="delete")
              this.closeUtente()
          }}
        />
      </View>
    )
  }
}
export default UtenteEditScreen;
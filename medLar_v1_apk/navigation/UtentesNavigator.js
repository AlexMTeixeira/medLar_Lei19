import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, Button, Image } from "react-native";
import {
    createStackNavigator,
} from "react-navigation";

import Utentes from "../screens/Utentes";
import Utente from "../screens/Utente";
import UtenteEdit from "../screens/UtenteEdit";
import MedicamentoAddUtente from "../screens/MedicamentoAddUtente"

import Icon from '@expo/vector-icons/Ionicons';

const UtentesStack = createStackNavigator({
    UtentesDashNavigator: Utentes,
    UtenteDashNavigator: Utente,
    MedicamentoAddUtenteNav: MedicamentoAddUtente,
    UtenteEditNavigator: UtenteEdit,
}, {
    initialRouteName: 'UtentesDashNavigator',
    navigationOptions: {
        drawerIcon: (
            <Image 
                source={require('../assets/images/utentes.png')}
                style={{ height: 24, width: 24, marginLeft: 25}}
            />
      )},
    defaultNavigationOptions: ({ navigation }) => {
        return {
          title: 'Lista de Utentes',
    
          headerLeft: ( <
            Icon style = {
                { paddingLeft: 10 }
            }
            onPress = {
                () => navigation.openDrawer()
            }
            name = "md-menu"
            size = { 30 }
            />
        )
        };
    }
});



export default UtentesStack;
/*
export default createBottomTabNavigator({
    HomeStack,
    LinksStack,
    SettingsStack
});*/
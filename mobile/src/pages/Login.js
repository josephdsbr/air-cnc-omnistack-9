import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Text, Image, TextInput,
   TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api';
import logo from '../assets/logo.png';

export default function Login({ navigation }) {
  /* Using states */
  const [email, setEmail] = useState('');
  const [techs, setTechs] = useState('');
  
  useEffect(() => {
    AsyncStorage.getItem('user')
      .then(user => {
        if (user) {
          navigation.navigate('List');
        }
      });
  },
   [])

  async function handleSubmit(){
    
    const response = await api.post('/sessions', {
      email
    })

    const {_id} = response.data;
    
    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('techs', techs);
    console.log(_id);

    navigation.navigate('List');
  }

  return (
    <KeyboardAvoidingView 
      behavior="padding"
      style={styles.conteiner}>
      <Image source={logo} />

      <View style={styles.form}>
        <Text style={styles.label}>SEU EMAIL *</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={text => setEmail(text)}
        />
         <Text style={styles.label}>TECNOLOGIAS *</Text>
        <TextInput
          style={styles.input}
          placeholder="Tecnologias de interesse"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Encontrar Spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  conteiner: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },

  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop:30, 
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
})
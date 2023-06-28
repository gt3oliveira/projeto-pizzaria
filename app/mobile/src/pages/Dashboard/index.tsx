import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParams } from '../../routes/app.routes'
import { api } from '../../services/api'

export default function Dashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>()

  const [number, setNumber] = useState('')
  const [name, setName] = useState('')

  async function openOrder() {
    if(number === ''){
      return
    }

    const response = await api.post('/order', { table: Number(number), name: name })
    // console.log(response.data)

    // navegando para outra página e repassando parametros da pagina atual
    navigation.navigate('Order', {number: number, order_id: response.data.id})

    setNumber('')
    setName('')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo pedido</Text>

      <TextInput 
        placeholder='Número da mesa'
        placeholderTextColor='#f0f0f0'
        style={styles.input}
        keyboardType='numeric'
        value={number}
        onChangeText={setNumber}
      />
      
      <TextInput 
        placeholder='Nome do cliente'
        placeholderTextColor='#f0f0f0'
        style={styles.input}        
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity style={styles.btn} onPress={openOrder}>
        <Text style={styles.btnText}>Abrir mesa</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#1d1d2e'
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24
  },
  input:{
    width: '90%',
    height: 60,
    backgroundColor: '#101026',
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontSize: 22,
    color: '#fff'
  },
  btn:{
    width: '90%',
    height: 40,
    backgroundColor: '#3fffa3',
    borderRadius: 4,
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText:{
    fontSize: 18,
    color: '#101026',
    fontWeight: 'bold'
  }
})


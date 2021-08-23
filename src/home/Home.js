import React from "react"
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, FlatList, ScrollView } from "react-native"
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import logo from '../utils/img/logo.png'
import cart from '../utils/img/cart.png'
import zelda from '../utils/img/zelda.png'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CardList, Count} from '../components'
import jogos from '../utils/mock/jogos'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default props => {
  const [count, setCount] = React.useState(0);

    useFocusEffect(
    React.useCallback(() => {
      async function getCart() {
        let cart = await AsyncStorage.getItem('@cart');

        cart = cart ? JSON.parse(cart) : [];
        setCount(cart.reduce((total, item) => total + item.count, 0));
      }

      getCart();

      return () => {};
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.bloq}>
          <Image source={logo} style={styles.image} />
          <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
            <Image source={cart} style={styles.cart} />
            <Count value={count}/>
          </TouchableOpacity>
        </View>

        <View style={styles.textView}>
          <Text style={styles.text}>Games</Text>
          <Text style={styles.textBold}>Populares</Text>
        </View>

        <FlatList
          numColumns={2}
          keyExtractor={(jogo) => jogo.id}
          data={jogos}
          renderItem={({item}) => <CardList item={item} navigation={props.navigation} />}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  image: {
    resizeMode: 'stretch',
    width: 170,
    height: 60
  },
  bloq: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
  },
  cart: {
    resizeMode: 'stretch',
    width: 30,
    height: 30,
    marginTop: 15,
    marginRight: 15
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 32
  },
  textView: {
    margin: 10
  },
  text: {
    fontSize: 32
  },
  viewCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 5,

  },
  actions: {
    backgroundColor: '#623FD9',
    borderRadius: 4,
    marginTop: 8
  },

  button: {
    color: '#fff',
    borderRadius: 20,
    textAlign: 'center'
  },
  imageCard: {
    width: 170,
    height: 78
  }
});

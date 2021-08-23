import React from "react"
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from "react-native"
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import logo from '../utils/img/logo.png'
import cart from '../utils/img/cart.png'
import zelda from '../utils/img/zelda.png'
import Icon from 'react-native-vector-icons/MaterialIcons';
import jogos from '../utils/mock/jogos';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CardList = ({ navigation, item }) => {

  async function add() {
    let cart = await AsyncStorage.getItem('@cart');

    cart = cart ? JSON.parse(cart) : [];

    const product = cart.find((i) => i.id  === item.id);

    if(product) {
      product.count++;
    } else {
      item.count = 1;
      cart.push(item);
    }

    await AsyncStorage.setItem('@cart', JSON.stringify(cart));

    navigation.navigate('Cart');
  }

    return (
        <View key={item.id} style={styles.viewCard}>
            <Card style={styles.card}>
                <Card.Cover source={zelda} style={styles.imageCard} />
                <Card.Content>
                  <Card.Title 
                    title={item.name}
                    titleNumberOfLines={2}
                    titleStyle={{fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}
                  />

                  
                  <Text style={{ fontSize: 9, textAlign: 'left', marginTop: 8 }}> {item.subtitle} </Text>
                  <Text style={{ fontSize: 9, textAlign: 'left' }}> Categoria/Gênero </Text>
                    
                </Card.Content>
                <TouchableOpacity onPress={add}>
                    <Card.Actions style={styles.actions}>
                        <Text style={styles.button}>{item.value}</Text>
                    </Card.Actions>
                </TouchableOpacity>
            </Card>
        </View>
    );
};

export default CardList;

const styles = StyleSheet.create({

    textBold: {
        fontWeight: 'bold',
        fontSize: 32
    },

    text: {
        fontSize: 32
    },
    viewCard: {
        margin: 11,
    },
    actions: {
        backgroundColor: '#623FD9',
        borderRadius: 4,
        marginTop: 8
    },
    card: {
        flexGrow: 1,
        backgroundColor: '#F6F6F6'
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
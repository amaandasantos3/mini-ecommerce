import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { Card } from 'react-native-paper';
import { NumberFormat } from '../components';
import plus from '../utils/img/plus-cart.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from "../utils/styles/Colors";

const CardList = ({ navigation, item }) => {

    async function add() {
        let cart = await AsyncStorage.getItem('@cart');

        cart = cart ? JSON.parse(cart) : [];

        const product = cart.find((i) => i.id === item.id);

        if (product) {
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
                <Card.Cover source={item.image} style={styles.imageCard} />
                <Card.Content>
                    <Card.Title
                        title={item.name}
                        titleNumberOfLines={2}
                        titleStyle={styles.title}
                    />
                    <Text style={styles.text}> {item.subtitle} </Text>
                    <Text style={styles.text}> Categoria/Gênero </Text>
                    <View style={styles.container}>
                        {item.category.map((i) => (

                            <Text style={styles.category}>{i.name}</Text>

                        ))}

                    </View>



                </Card.Content>
                <TouchableOpacity style={{}} onPress={add}>
                    <Card.Actions style={styles.actions}>
                        <Image source={plus} style={{ marginRight: 5 }} />
                        <NumberFormat value={item.value} style={styles.button} />

                    </Card.Actions>
                </TouchableOpacity>
            </Card>
        </View>
    );
};

export default CardList;

const styles = StyleSheet.create({
    container: {
        height: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#DBDBDB',
        borderRadius: 3,
        marginTop: 6
    },
    textBold: {
        fontWeight: 'bold',
        fontSize: 32
    },
    title:{
        fontSize: 14, 
        lineHeight: 15, 
        fontWeight: 'bold', 
        textAlign: 'center' 
    },
    category: {
        fontSize: 9,
        alignSelf: 'center'
    },
    text: {
        fontSize: 9,
        textAlign: 'left',
        marginTop: 5
    },
    viewCard: {
        margin: 11,
    },
    actions: {
        backgroundColor: '#623FD9',
        borderRadius: 4,
        marginTop: 8,
        alignItems: 'center',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        justifyContent: 'center'
    },
    card: {
        flexGrow: 1,
        backgroundColor: '#F6F6F6',
        width: '100%'
    },
    button: {
        color: '#fff',


        textAlign: 'center'
    },
    imageCard: {
        width: 170,
        height: 78
    }
});
import React, { useState } from 'react';

import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import zelda from '../utils/img/zelda.png' 

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../utils/styles/Colors';
import { NumberFormat } from './';

const CartItem = ({remove, item, refresh}) => {

    const [count, setCount] = useState(item?.count || 0);

    async function increase() {
      let cart = JSON.parse(await AsyncStorage.getItem('@cart'));

      product = cart.find((i) => i.id === item.id);

      product.count = count + 1;

      await AsyncStorage.setItem('@cart', JSON.stringify(cart));

      setCount(product.count);

      refresh();
    }
    
    async function decrease() {
      const value = count - 1;
      
      let cart = JSON.parse(await AsyncStorage.getItem('@cart'));
      
      let product = cart.find((i) => i.id === item.id);
      
      if (value < 1) {
        product.count = 0;
      } else {
        product.count = value;
      }
      
      setCount(product.count);
      await AsyncStorage.setItem('@cart', JSON.stringify(cart));

      refresh();
    }
    
  return (
<View style={{flexDirection: 'row', marginBottom: 10}}>
    <View style={{ flex: 1, flexDirection: 'row' }}>
              <Image
                source={zelda}
                style={styles.productImg}
              />

              <View style={{ padding: 10, flex: 1 }}>
                <Text numberOfLines={12} style={styles.title}>
                 {item.name}
                </Text>
                <NumberFormat style={styles.title} value={item.value}/>
              </View>
            </View>

            <View style={{ backgroundColor: '#e2e2e2', borderRadius: 10, color: '#000', flex: 0.2 }}>
                <Button onPress={increase}><Icon name="plus"/></Button>
                <Button>
                    {count}
                </Button>
                {
                    count === 0 ? (
                        <Button onPress={remove}><Icon name={'delete'} color={'red'}/></Button>
                        ) : (
                            <Button onPress={decrease}><Icon name={'minus'}/></Button>
                    )
                }
            </View>
</View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white
    },
  
    input: {
      width: '70%',
      borderRadius: 160,
      height: 40
    },
  
    button: {
      borderRadius: 90
    },
  
    cart: {
      resizeMode: 'stretch',
      width: 30,
      height: 30,
      marginTop: 15
    },
    textBold: {
      fontWeight: 'bold',
      fontSize: 32
    },
    textView: {
      margin: 10,
      marginTop: 110
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      margin: 5,
      marginTop: 55
    },
    viewCard: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      margin: 5,
      marginTop: 10
    },
    actions: {
      backgroundColor: Colors.purple,
      borderRadius: 4,
      marginTop: 8
    },
    card: {
      width: '45%',
      backgroundColor: Colors.grayBlack
    },
    button: {
      color: Colors.white,
      borderRadius: 20,
      textAlign: 'center'
    },
    imageCard: {
      width: 170,
      height: 168,
      alignSelf: 'flex-end',
      borderRadius: 20
    },
    innerContainer: {
      flexDirection: 'row',
      marginTop: 26
  
    },
    productImg: {
      width: 100,
      height: 85,
      borderRadius: 5
    },
   
    title: {
      flex: 1,
      fontWeight: "500",
      fontSize: 16
    },
  });
  
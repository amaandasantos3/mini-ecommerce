import React from "react"
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, Touchable, FlatList, ScrollView } from "react-native"
import { Avatar, Button, Card, Title, Paragraph, TextInput } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

import {CartItem, Row, Checkout, NumberFormat} from '../components';

import cep from '../utils/api/cep';
import logo from '../utils/img/logo.png'
import zelda from '../utils/img/zelda.png' 
import cart from '../utils/img/checkout-cart.png' 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

export default props => {
  const [zipcode, setZipcode] = React.useState('');
  const [address, setAddress] = React.useState();
  
  const [items, setItems] = React.useState([]);
  
  const [subtotal, setSubtotal] = React.useState(0);
  const [shippingCost, setShippingCost] = React.useState(0);
  const [total, setTotal] = React.useState(0);

  const [canBuy, setCanBuy] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  
  useFocusEffect(
    React.useCallback(() => {
      getData();
      
      return () => {
        setItems([]);
        setShippingCost(0);
        setZipcode('');
        setAddress(null);
      };
    }, [])
    );
    
    React.useEffect(() => {
      getData();
    }, [shippingCost]);
    
    React.useEffect(() => {
      setCanBuy(Boolean(address && items.length));
    }, [address, items]);

  async function getData() {
    let cart = await AsyncStorage.getItem('@cart');
  
    cart = cart ? JSON.parse(cart) : [];
  
    setItems(cart);

    const subtotal = cart.reduce((sum, item) => {
      let discount = parseInt(item.count / 3) * 3;
      const count = (item.count - discount) * item.value;

      discount *= (item.value - (item.value * 0.25));

      return sum + (discount + count);
    }, 0);

    setSubtotal(subtotal);
    setTotal(shippingCost + subtotal);
  }

async function remove(id) {
  let _items = items.filter(({id: item_id}) => item_id !== id);

  await AsyncStorage.setItem('@cart', JSON.stringify(_items));

  setItems(_items);

  getData();
}

function calcShippingCost() {
  if(zipcode && zipcode.length === 8) {
    cep(zipcode)
      .then(r => {
        if(r.uf === 'PE') {
          setShippingCost(100);
        } else {
          setShippingCost(200);
        }

        setAddress(r);
      })
  }
}

async function reset() {
  await AsyncStorage.setItem('@cart', '[]');

  setItems([]);
  setShippingCost(0);
  setAddress();
  setShowModal(false);

  props.navigation.navigate('Home');
}

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#623FD9' }}>
      {showModal && <Checkout price={total} checkout={reset}/>}
      <View style={{ height: '97%', backgroundColor: 'white', borderRadius: 30, marginTop: -47, paddingBottom: 20 }}>
        <ScrollView>
        <View style={styles.textView}>

          <TouchableOpacity onPress={() => props.navigation.navigate('Home')} style={{ width: '15%', justifyContent: 'center', alignItems: 'center', marginTop: -20 }}>
            <Icon name="keyboard-backspace" size={40} color="#623FD9" />
          </TouchableOpacity>

          <Text style={styles.text}>Seu</Text>
          <Text style={styles.textBold}>Carrinho</Text>

          <View style={styles.innerContainer}>
            {items.map((i) => (
              <CartItem 
              key={i.id} 
              item={i}
              refresh={getData}
              remove={() => remove(i.id)}
               />
            ))}
          </View>

        </View>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 24, marginLeft: 20 }}>Calcule o Frete</Text>
          <View style={styles.viewCard}>
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Seu cep"
              value={zipcode}
              keyboardType={'numeric'}
              maxLength={8}
              onChangeText={setZipcode}
            />
            <Button style={styles.button} mode="contained" onPress={calcShippingCost}>
              <Icon name="google-maps" size={25} color="#fff" />
            </Button>
          </View>
        </View>

        {
          address && (
            <View style={styles.addressContainer}>
              <Text style={styles.addressText}>
                {
                  (({logradouro, bairro, localidade, uf}) => {
                    return logradouro + ", " + bairro + ", " + localidade + "-" + uf;
                  })(address)
                }
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.addressLabel}>valor do frete: </Text>
                <NumberFormat style={styles.addressValue} value={shippingCost}/>
              </View>
          </View>
          )
        }

        <View style={styles.resume}>
          {
            address && (
              <Row>
                <Text style={styles.resumeLabel}>Frete</Text>
                <NumberFormat value={shippingCost} style={styles.resumeShippingCost}/>
              </Row>
            )
          }

          <Row>
            <Text style={styles.resumeLabel}>{items.length} Itens</Text>
            <NumberFormat value={subtotal} style={styles.resumeValue}/>
          </Row>
        </View>
        </ScrollView>
      </View>
      <TouchableOpacity onPress={() => setShowModal(true)} disabled={!canBuy}>
        <View style={[styles.viewCard, {opacity: canBuy ? 1 : 0.5}]}>
          <Text style={{fontSize: 20, color: '#e2e2e2'}}>
            Finalizar <Text style={{fontWeight: 'bold'}}>Compra</Text>
          </Text>
            
          <Image source={cart}/>
        </View>

      </TouchableOpacity>

    </SafeAreaView>

  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
  },
  actions: {
    backgroundColor: '#623FD9',
    borderRadius: 4,
    marginTop: 8
  },
  card: {
    width: '45%',
    backgroundColor: '#F6F6F6'
  },
  button: {
    color: '#fff',
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
    flexDirection: 'column',
    marginTop: 26
  },
  productImg: {
    width: 100,
    height: 85,
    borderRadius: 5
  },
  productDetails: {
    backgroundColor: 'red'
  },
  title: {
    flex: 1,
    fontWeight: "500",
    fontSize: 16
  },
  addressContainer: {
    backgroundColor: '#F6F6F6',
    marginTop: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addressText: {
    color: 'gray',
    fontWeight: 'bold',
  },
  addressLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  addressValue: {
    fontSize: 16,
    color: '#F524B6',
    fontWeight: 'bold'
  },
  resume: {
    marginVertical: 50,
    paddingHorizontal: 16
  },
  resumeLabel: {
    fontSize: 16,
    color: 'gray'
  },
  resumeShippingCost: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  resumeValue: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

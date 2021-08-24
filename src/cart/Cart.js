import React from "react"
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native"
import { Avatar, TextInput } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

import { CartItem, Row, Checkout, NumberFormat } from '../components';

import cep from '../utils/api/cep';
import game from '../utils/img/video-game.png'
import cart from '../utils/img/checkout-cart.png'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import IconL from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from "../utils/styles/Colors";

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
    let _items = items.filter(({ id: item_id }) => item_id !== id);

    await AsyncStorage.setItem('@cart', JSON.stringify(_items));

    setItems(_items);

    getData();
  }

  function calcShippingCost() {
    if (zipcode && zipcode.length === 8) {
      cep(zipcode)
        .then(r => {
          if (r.uf === 'PE') {
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
    <SafeAreaView style={styles.containerP}>
      {showModal && <Checkout price={total} checkout={reset} />}
      <View style={styles.inner}>
        <ScrollView>
          <View style={styles.textView}>

            <TouchableOpacity onPress={() => props.navigation.navigate('Home')} style={styles.goBack}>
              <Icon name="keyboard-backspace" size={40} color="#623FD9" />
            </TouchableOpacity>

            <Text style={styles.text}>Seu</Text>
            <Text style={styles.textBold}>Carrinho</Text>
            {
              items.length == 0 ?
                <View> 
                  <Text style={styles.textN}> Você ainda não possui itens no seu carrinho! </Text>
                  <Image source={game} style={styles.image} />
                </View>
                
                : <View style={styles.innerContainer}>
                  {items.map((i) => (
                    <CartItem
                      key={i.id}
                      item={i}
                      refresh={getData}
                      remove={() => remove(i.id)}
                    />
                  ))}
                </View>
            }


          </View>
          <View>
            <View style={styles.containerCep} />
            <Text style={{ color: '#707070', fontSize: 16, marginLeft: 20, marginTop: 30 }}>Calcule o Frete</Text>
            <View style={styles.viewCard}>
              <TextInput
                style={styles.input}
                label="Seu cep"
                value={zipcode}
                keyboardType={'numeric'}
                maxLength={8}
                onChangeText={setZipcode}
              />
              <TouchableOpacity style={{ backgroundColor: '#623FD9', borderRadius: 80, width: 50 }} onPress={calcShippingCost}>
                <IconL name="location" size={40} color="#fff" style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 9 }} />
              </TouchableOpacity>

            </View>
          </View>

          {
            address && (
              <View style={styles.addressContainer}>
                <Text style={styles.addressText}>
                  {
                    (({ logradouro, bairro, localidade, uf }) => {
                      return logradouro + ", " + bairro + ", " + localidade + "-" + uf;
                    })(address)
                  }
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.addressLabel}>valor do frete: </Text>
                  <NumberFormat style={styles.addressValue} value={shippingCost} />
                </View>
              </View>
            )
          }

          <View style={styles.resume}>
            {
              address && (
                <Row>
                  <Text style={styles.resumeLabel}>Frete</Text>
                  <NumberFormat value={shippingCost} style={styles.resumeShippingCost} />
                </Row>
              )
            }

            <Row>
              <Text style={styles.resumeLabel}>{items.length} Itens</Text>
              <NumberFormat value={subtotal} style={styles.resumeValue} />
            </Row>
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity onPress={() => setShowModal(true)} disabled={!canBuy}>
        <View style={[styles.viewCard, { opacity: canBuy ? 1 : 0.5 }]}>
          <Text style={{ fontSize: 20, color: '#e2e2e2' }}>
            Finalizar <Text style={{ fontWeight: 'bold' }}>Compra</Text>
          </Text>

          <Image source={cart} />
        </View>

      </TouchableOpacity>

    </SafeAreaView>

  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  containerP: {
    flex: 1,
    backgroundColor: Colors.purple
  },
  goBack: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20
  },
  textN:{
    textAlign: 'center',
    fontSize: 15,
    marginTop: 20,
  },
  image:{
    width: 100,
    height: 100,
    marginTop: 20,
    alignSelf: 'center'
  },
  containerCep:{
    width: 60, 
    height: 4, 
    backgroundColor: Colors.grayLight, 
    borderRadius: 50, 
    alignSelf: 'center',
    margin: 16
  },
  inner: {
    height: '97%',
    backgroundColor: Colors.white,
    borderRadius: 30,
    marginTop: -47,
    paddingBottom: 20
  },

  input: {
    width: '80%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: Colors.white,
    borderWidth: 1,
    height: 50,
    borderColor: Colors.purple
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
    fontSize: 32,

    margin: 5,
    marginTop: 55
  },
  viewCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    margin: 16,
  },
  actions: {
    backgroundColor: Colors.purple,
    borderRadius: 4,
    marginTop: 8
  },
  card: {
    width: '45%',
    backgroundColor: Colors.gray
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
 
  title: {
    flex: 1,
    fontWeight: "500",
    fontSize: 16
  },
  addressContainer: {
    backgroundColor: Colors.grayLight,
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
    color: Colors.pink,
    fontWeight: 'bold'
  },
  resume: {
    marginVertical: 50,
    paddingHorizontal: 16
  },
  resumeLabel: {
    fontSize: 16,
    color: Colors.gray
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

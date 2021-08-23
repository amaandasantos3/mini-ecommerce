import React from 'react';
import { View, Text, StyleSheet } from 'react-native'; 
import { Button } from 'react-native-paper';
import { Row, NumberFormat } from './';

export default ({price, checkout}) => {
    return (
        <View style={styles.container}>
            <View style={styles.modal}>
                <Text style={styles.title}>
                    Compra
                    {"\n"}
                    <Text style={{fontWeight: 'bold'}}>
                        Finalizada
                    </Text>
                </Text>

                <Text style={styles.description}>
                    Sua compra foi finalizada com sucesso!
                </Text>

                <Row>
                    <Text style={styles.label}>
                        Valor da compra:
                    </Text>
                    <NumberFormat style={styles.price} value={price}/>
                </Row>

                <Button 
                    mode={'contained'}
                    uppercase={false}
                    style={styles.button}
                    labelStyle={styles.buttonText}
                    onPress={checkout}
                 >
                    Voltar para a Home
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        zIndex: 999,

        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        width: 314,
        height: 311,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20
    },
    title: {
        fontSize: 32,
        // fontFamily: 'Open Sans', TODO add Open Sans
    },
    button: {
        marginTop: 20,

        width: 277,
        height: 49,
        borderRadius: 6,
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16
    },
    description: {
        marginTop: 36,
        marginBottom: 36,
        fontSize: 16,
        color: '#303030'
    },
    label: {
        fontSize: 16,
        color: '#878787'
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Count = ({value}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.count}>{value}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: '#F524B6',
        borderRadius: 50,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    count: {
        color: 'white',
        fontWeight: 'bold'
    }
});

export default Count;
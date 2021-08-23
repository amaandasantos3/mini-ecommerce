import React from 'react';
import NumberFormat from 'react-number-format';
import { Text } from 'react-native';

export default ({value, style}) => {
    return (
        <NumberFormat 
            value={value} 
            displayType={'text'}
            thousandSeparator={true} 
            prefix={'R$ '} 
            renderText={(text) => (
                <Text style={style}>{text}</Text>
            )}
          />
    )
}
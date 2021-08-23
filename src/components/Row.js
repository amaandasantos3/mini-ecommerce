import React from 'react';
import {View} from 'react-native';

const Row = ({children}) => (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {children}
    </View>
);

export default Row;
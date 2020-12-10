import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Container, Text, H1, H3, Button} from 'native-base';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';
import PedidoContext from '../context/pedidos/pedidosContext';

const ProgesoPedido = () => {
    const {idPedido} = useContext(PedidoContext);

    return (
        <View>
            <Text>{idPedido}</Text>
        </View>
    )
}

export default ProgesoPedido

const styles = StyleSheet.create({})

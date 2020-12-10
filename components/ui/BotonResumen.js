import React, {useContext} from 'react'
import { StyleSheet,  View } from 'react-native'
import {Button, Text} from 'native-base';
import globalStyles from '../../styles/global';
//Navigation
import {useNavigation} from '@react-navigation/native';
//Context
import PedidoContext from '../../context/pedidos/pedidosContext';

const BotonResumen = () => {
    const navigation = useNavigation();
    const {pedido} = useContext(PedidoContext);

    if(pedido.length === 0) return null;

    return (
        <Button style={globalStyles.boton} onPress={() => navigation.navigate("ResumenPedido")}>
            <Text style={globalStyles.botonTexto}>Ir a Pedido</Text>
        </Button>
    )
}

export default BotonResumen;

const styles = StyleSheet.create({})

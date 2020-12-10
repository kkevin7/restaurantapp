import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Container, Text, H1, H3, Button} from 'native-base';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';
//Context
import PedidoContext from '../context/pedidos/pedidosContext';
//Firebase
import firebase from '../firebase';

const ProgesoPedido = () => {
    //context
    const {idPedido} = useContext(PedidoContext);
    //state
    const [tiempo, setTiempo] = useState(0);

    useEffect(() => {
        const obtenerProducto = () => {
            firebase.db.collection('ordenes').doc(idPedido).onSnapshot(handleSnapshot);
        }
        obtenerProducto();
    },[])

    const handleSnapshot = (doc) => {
        setTiempo(doc.data().tiempoentrega);
    }

    return (
        <View>
            <Text>{tiempo}</Text>
        </View>
    )
}

export default ProgesoPedido

const styles = StyleSheet.create({})

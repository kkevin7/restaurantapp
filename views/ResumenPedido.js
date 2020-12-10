import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Button,
  H1,
  Footer,
  FooterTab,
} from 'native-base';
import globalStyles from '../styles/global';
//Context
import PedidoContext from '../context/pedidos/pedidosContext';
import gobalStyles from '../styles/global';
//Navigation
import {useNavigation} from '@react-navigation/native';

const ResumenPedido = () => {
    const navigation = useNavigation();

    //Context pedido
    const {pedido, total, mostrarResumen} = useContext(PedidoContext);

    useEffect(()=>{
        calcularTotal();
    },[pedido]);

    const calcularTotal = () => {
        let nuevoTotal = 0;
        nuevoTotal = pedido.reduce((nuevoTotal, articulo) => nuevoTotal + articulo.total, 0);
        mostrarResumen(nuevoTotal);
    }

    return (
           <Container style={globalStyles.contenedor}>
               <Content style={globalStyles.contenido}>
                   <H1 style={globalStyles.titulo}>Resumen Pedido</H1>
                   {pedido.map((platillo, i) => {
                       const {cantidad, nombre, imagen, id, precio} = platillo;
                       return (
                        <List key={id + i}>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail large square source={{uri: imagen}} />
                                </Left>

                                <Body>
                                    <Text>{nombre}</Text>
                                    <Text>Cantidad: {cantidad}</Text>
                                    <Text>Precio: $ {precio}</Text>
                                </Body>
                            </ListItem>
                        </List>
                       );
                   })}

                   <Text style={globalStyles.cantidad}>Total a Pagar: $ {Number(total).toFixed(2)}</Text>
               </Content>
           </Container>
    )
}

export default ResumenPedido;

const styles = StyleSheet.create({});

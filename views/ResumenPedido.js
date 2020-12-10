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
//Styles
import gobalStyles from '../styles/global';
//Navigation
import {useNavigation} from '@react-navigation/native';
//Assets
import defaultImg from '../assets/images/image.png';

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
                                    <Thumbnail large square source={imagen ? {uri: imagen} : defaultImg} />
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

                   <Button
                        style={[ {marginTop: 20}]} 
                        full
                        dark
                        onPress={() => navigation.navigate("Menu")}
                   >
                       <Text style={[globalStyles.botonTexto, {color: "#FFF"}]}>Seguir Pidiendo</Text>
                   </Button>
               </Content>

               <Footer>
                   <FooterTab>
                   <Button
                        style={[globalStyles.boton]} 
                        full
                        onPress={() => navigation.navigate("ProgresoPedido")}
                   >
                       <Text style={globalStyles.botonTexto}>ordenar Pedido</Text>
                   </Button>
                   </FooterTab>
               </Footer>
           </Container>
    )
}

export default ResumenPedido;

const styles = StyleSheet.create({});

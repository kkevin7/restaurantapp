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
//Firebase
import firebase from '../firebase';
//Styles
import gobalStyles from '../styles/global';
//Navigation
import {useNavigation} from '@react-navigation/native';
//Assets
import defaultImg from '../assets/images/image.png';

const ResumenPedido = () => {
    const navigation = useNavigation();

    //Context pedido
    const {pedido, total, mostrarResumen, eliminarProducto} = useContext(PedidoContext);

    useEffect(()=>{
        calcularTotal();
    },[pedido]);

    const calcularTotal = () => {
        let nuevoTotal = 0;
        nuevoTotal = pedido.reduce((nuevoTotal, articulo) => nuevoTotal + articulo.total, 0);
        mostrarResumen(nuevoTotal);
    }

    // redirecciona a progreso pedido
    const progresoPedido = () => {
        Alert.alert(
            'Revisa tu pedido',
            'Una vez que realizas tu pedido, no podrás cambiarlo',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        //crear un objeto
                        const pedidoObj = {
                            tiempoentrega: 0,
                            completado: false,
                            total: Number(total),
                            orden: pedido,
                            creado: Date.now(),
                        }

                        //Guardar el pedido
                        try {
                            const pedido = await firebase.db.collection('ordenes').add(pedidoObj);
                            console.log(pedido.id);
                        } catch (error) {
                            console.log("Error crear pedido: ", error)
                        }

                        navigation.navigate("ProgresoPedido");
                    }
                },
                {
                    text: 'Cancelar',
                    style: 'cancel'
                }
            ]
        );
    }

    const confirmarEliminacion = (id) => {
        console.log(id);
        Alert.alert(
            '¿Deseas Eliminar este articulo?',
            'Una vez eliminado no se podrá recuperar',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        //Eliminar del state
                        eliminarProducto(id);
                    }
                },
                {
                    text: 'Calcelar',
                    style: 'cancel'
                }
            ]
        );
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
                                    <Button
                                        full
                                        danger
                                        style={{marginTop: 20}}
                                        onPress={() => confirmarEliminacion(id)}
                                    >
                                        <Text style={[globalStyles.botonTexto, {color: '#FFF'}]}>Eliminar</Text>
                                    </Button>
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
                        onPress={progresoPedido}
                   >
                       <Text style={globalStyles.botonTexto}>Ordenar Pedido</Text>
                   </Button>
                   </FooterTab>
               </Footer>
           </Container>
    )
}

export default ResumenPedido;

const styles = StyleSheet.create({});

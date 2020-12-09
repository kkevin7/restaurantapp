import React, {useContext} from 'react';
import { StyleSheet, View, Image } from 'react-native';
import {
    Container,
    Content,
    Footer,
    FooterTab,
    Button,
    Body,
    Text,
    H1,
    Card,
    CardItem,
} from 'native-base';
import globalStyles from '../styles/global';
//Context
import PedidoContext from '../context/pedidos/pedidosContext';
import gobalStyles from '../styles/global';

const DetallePlatillo = () => {

    //Pedido conext
    const {platillo} = useContext(PedidoContext);
    const {nombre, imagen, descripcion, precio} = platillo;

    return (
        <Container style={globalStyles.contenedor}>
            <Content style={globalStyles.contenido}>
                <H1 style={gobalStyles.titulo}>{nombre}</H1>
                <Card>
                    <CardItem>
                        <Body>
                            <Image source={{uri: imagen}} style={globalStyles.imagen} />
                        </Body>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    )
}

export default DetallePlatillo

const styles = StyleSheet.create({})

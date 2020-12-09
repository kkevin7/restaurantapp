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
//Navigation
import {useNavigation} from '@react-navigation/native';
//Assets
import defaultImg from '../assets/images/image.png';

const DetallePlatillo = () => {
    const navigation = useNavigation();
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
                            <Image source={imagen ? {uri: imagen} : defaultImg} style={globalStyles.imagen} />
                            <Text style={{marginTop: 20}}>{descripcion}</Text>
                            <Text style={globalStyles.cantidad}>Precio: $ {Number(precio).toFixed(2)}</Text>
                        </Body>
                    </CardItem>
                </Card>
            </Content>
            <Footer>
                <FooterTab>
                    <Button style={globalStyles.boton}  onPress={() => navigation.navigate('FormularioPlatillo')}>
                        <Text style={globalStyles.botonTexto}>Ordenar Platillo</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    )
}

export default DetallePlatillo

const styles = StyleSheet.create({})

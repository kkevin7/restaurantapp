import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {
  Container,
  Content,
  Form,
  Icon,
  Input,
  Grid,
  Col,
  Button,
  Text,
  Footer,
  FooterTab,
} from 'native-base';
import globalStyles from '../styles/global';
//Context
import PedidoContext from '../context/pedidos/pedidosContext';
import gobalStyles from '../styles/global';
//Navigation
import {useNavigation} from '@react-navigation/native';

const FormularioPlatillo = () => {
  const navigation = useNavigation();
  const {platillo, guardarPedido} = useContext(PedidoContext);
  const {precio} = platillo;

  //State
  const [cantidad, setCantidad] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calcularTotal();
  }, [cantidad]);

  //Calcular el total de platillo
  const calcularTotal = () => {
    const totalPagar = precio * cantidad;
    setTotal(totalPagar);
  };

  const calcularCantidad = (cantidad) => {
    setCantidad(cantidad);
  };

  const disminuirUno = () => {
    if (cantidad > 0) {
      setCantidad(parseInt(cantidad) - 1);
    } else if (!cantidad) {
      setCantidad(1);
    }
  };

  const incremetarUno = () => {
    if (!cantidad) {
      setCantidad(1);
    } else {
      setCantidad(parseInt(cantidad) + 1);
    }
  };

  const confirmarOrden = () => {
    Alert.alert(
      '¿Deseas confirmar tu pedido?',
      'Un pedido confirmado ya no se podrá modificar',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            const pedido = {...platillo, cantidad, total}
            guardarPedido(pedido);
            navigation.navigate("ResumenPedido")
          },
        },
        {
          text: 'Cancerlar',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <Container>
      <Content>
        <Form>
          <Text style={globalStyles.titulo}>Cantidad</Text>
          <Grid>
            <Col>
              <Button
                props
                dark
                style={{height: 80, justifyContent: 'center', width: '100%'}}
                onPress={disminuirUno}>
                <Icon style={{fontSize: 40}} name="remove" />
              </Button>
            </Col>
            <Col>
              <Input
                value={cantidad.toString()}
                style={{textAlign: 'center', fontSize: 20}}
                keyboardType="numeric"
                onChangeText={(cantidad) => calcularCantidad(cantidad)}
              />
            </Col>
            <Col>
              <Button
                props
                dark
                style={{height: 80, justifyContent: 'center', width: '100%'}}
                onPress={incremetarUno}>
                <Icon style={{fontSize: 40}} name="add" />
              </Button>
            </Col>
          </Grid>

          <Text style={globalStyles.cantidad}>Subtotal: $ {total}</Text>
        </Form>
      </Content>

      <Footer>
        <FooterTab>
          <Button style={globalStyles.boton} onPress={() => confirmarOrden()}>
            <Text style={globalStyles.botonTexto}>Ordenar Platillo</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default FormularioPlatillo;

const styles = StyleSheet.create({});

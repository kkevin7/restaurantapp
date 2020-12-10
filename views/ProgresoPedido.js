import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Container, Text, H1, H3, Button} from 'native-base';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';
//Context
import PedidoContext from '../context/pedidos/pedidosContext';
//Firebase
import firebase from '../firebase';
import Countdown from 'react-countdown';

const ProgesoPedido = () => {
  //context
  const navigation = useNavigation();
  const {idPedido} = useContext(PedidoContext);
  //state
  const [tiempo, setTiempo] = useState(0);
  const [completado, setCompletado] = useState(false);

  useEffect(() => {
    const obtenerProducto = () => {
      firebase.db
        .collection('ordenes')
        .doc(idPedido)
        .onSnapshot(handleSnapshot);
    };
    obtenerProducto();
  }, []);

  const handleSnapshot = (doc) => {
    setTiempo(doc.data().tiempoentrega);
    setCompletado(doc.data().completado);
  };

  //Muestra el countdown en la pantalla
  const renderer = ({minutes, seconds}) => {
    return (
      <Text style={styles.tiempo}>
        {minutes}:{seconds}
      </Text>
    );
  };

  return (
    <Container style={globalStyles.contenedor}>
      <View
        style={[globalStyles.contenido, {marginTop: 50, alignItems: 'center'}]}>
        {tiempo === 0 && (
          <>
            <Text style={{textAlign: 'center'}}>Hemos recibido tu orden..</Text>
            <Text style={{textAlign: 'center'}}>
              Estamos calculando el tiempo de entrega
            </Text>
          </>
        )}

        {!completado && tiempo > 0 && (
          <>
            <Text style={{textAlign: 'center'}}>
              Su orden estará lista en: {tiempo} Minutos
            </Text>
            <Text>
              <Countdown
                date={Date.now() + tiempo * 60000}
                renderer={renderer}
              />
            </Text>
          </>
        )}

        {completado && (
            <>
            <H1 style={styles.textCompletado}>Orden Lista</H1>
            <H3 style={styles.textCompletado}>
              Por favor, pase a recoger su pedido
            </H3>
            <Button
              style={[globalStyles.boton, {marginTop: 100}]}
              rounded
              block
              onPress={() => navigation.navigate('NuevaOrden')}
              >
              <Text style={globalStyles.botonTexto}>
                Comenzar una Nueva Orden
              </Text>
            </Button>
            </>
        )}

      </View>
    </Container>
  );
};

export default ProgesoPedido;

const styles = StyleSheet.create({
  tiempo: {
    marginBottom: 20,
    fontSize: 60,
    textAlign: 'center',
    marginTop: 30,
  },
  textCompletado: {
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
});

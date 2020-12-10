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
  const {idPedido} = useContext(PedidoContext);
  //state
  const [tiempo, setTiempo] = useState(0);

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

        {tiempo > 0 && (
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
});

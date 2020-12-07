import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Button, Text} from 'native-base';
//Styles
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';

const NuevaOrden = () => {
  const navigation = useNavigation();

  return (
    <Container style={globalStyles.contenedor}>
      <View style={[globalStyles.contenido, styles.contenido]}>
        <Button
          style={globalStyles.boton}
          rounded
          block
          onPress={() => navigation.navigate('Menu')}>
          <Text style={globalStyles.botonTexto}>Crear Nueva Orden</Text>
        </Button>
      </View>
    </Container>
  );
};

export default NuevaOrden;

const styles = StyleSheet.create({
  contenido: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

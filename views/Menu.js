import React, {useContext, useEffect, Fragment} from 'react';
import {StyleSheet, View} from 'react-native';
//Contex
import FirebaseContext from '../context/firebase/firebaseConext';
import PedidoContext from '../context/pedidos/pedidosContext';
//Navigation
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  Separator,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Body,
} from 'native-base';
import globalStyles from '../styles/global';
//Assets
import defaultImg from '../assets/images/image.png';

const Menu = () => {
  const navigation = useNavigation();
  //Context 
  const {menu, obtnerProductos} = useContext(FirebaseContext);
  const {seleccionarPlatillo} = useContext(PedidoContext);

  useEffect(() => {
    obtnerProductos();
  }, []);

  const mostrarHeading = (categoria, i) => {
    if (i > 0) {
      const categoriaAnterior = menu[i - 1].categoria;
      if (categoriaAnterior !== categoria) {
        return (
          <Separator style={styles.separador}>
            <Text style={styles.separadorTexto}>{categoria.toUpperCase()}</Text>
          </Separator>
        );
      }
    } else {
      return (
        <Separator style={styles.separador}>
          <Text style={styles.separadorTexto}>{categoria.toUpperCase()}</Text>
        </Separator>
      );
    }
  };

  if (!menu) return null;

  return (
    <Container style={globalStyles.contenedor}>
      <Content style={{backgroundColor: '#FFF'}}>
        <List>
          {menu.map((platillo, i) => {
            const {imagen, nombre, descripcion, categoria, id} = platillo;
            return (
              <Fragment key={id}>
                {mostrarHeading(categoria, i)}
                <ListItem
                  onPress={ () => {
                    // Eliminar algunas propiedad del platillo
                    const {existencia, ...platillo2} = platillo;
                    
                    seleccionarPlatillo(platillo2);
                    navigation.navigate('DetallePlatillo');
                  }}
                >
                  <Thumbnail
                    large
                    square
                    source={imagen ? {uri: imagen} : defaultImg}
                  />
                  <Body>
                    <Text>{nombre}</Text>
                    <Text note numberOfLines={3}>
                      {descripcion}
                    </Text>
                  </Body>
                </ListItem>
              </Fragment>
            );
          })}
        </List>
      </Content>
    </Container>
  );
};

export default Menu;

const styles = StyleSheet.create({
  separador: {
    backgroundColor: '#000'
  },
  separadorTexto: {
    color: '#FFDA00',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
});

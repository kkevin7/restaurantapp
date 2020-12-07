import React, {useContext, useEffect, Fragment} from 'react';
import {StyleSheet, View} from 'react-native';
import FirebaseContext from '../context/firebase/firebaseConext';
import {
    Container,
    Separator,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Body
} from 'native-base'
import globalStyles from '../styles/global'
//Assets
import defaultImg from '../assets/images/image.png';

const Menu = () => {
  //Contet de Firebase
  const {menu, obtnerProductos} = useContext(FirebaseContext);

  useEffect(() => {
    obtnerProductos();
  }, []);

  console.log("menu: ",menu);

  if(!menu) return null;

  return (
    <Container style={globalStyles.contenedor}>
      <Content style={{backgroundColor: '#FFF'}}>
        <List>
          {menu.map(platillo => {
            const { imagen, nombre, descripcion, categoria, id} = platillo;
            return(
              <Fragment key={id}>
                <ListItem>
                <Thumbnail large square source={imagen ? {uri: imagen} : defaultImg} />
                  <Body>
                    <Text>{nombre}</Text>
                    <Text
                    note
                    numberOfLines={3}
                    >{descripcion}</Text>
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

const styles = StyleSheet.create({});

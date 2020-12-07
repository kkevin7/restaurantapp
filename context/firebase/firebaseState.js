import React, {useReducer} from 'react';
import firebase from '../../firebase';
import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseConext';
//Actions Types
import {OBTNER_PRODUCTOS_EXITO} from '../types';

const FirebaseState = (props) => {
  // Crear state inicial
  const initialState = {
    menu: [],
  };

  //useReducer con dispatch para ejecutar las funciones
  const [state, dispatch] = useReducer(FirebaseReducer, initialState);

  //Funcion que se ejecuta para traer productos
  const obtnerProductos = () => {

    firebase.db
      .collection('productos')
      .where('existencia', '==', true)
      .onSnapshot(handleSnapshot);

    async function handleSnapshot(snapshot) {
      let platillos = await snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      dispatch({
          type: OBTNER_PRODUCTOS_EXITO,
          payload: platillos
      })
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        menu: state.menu,
        obtnerProductos,
      }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseState;

import React, {useReducer} from 'react';
import firebase from '../../firebase';
import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseConext';
//Actions Types
import {OBTNER_PRODUCTOS} from '../types';

const FirebaseState = (props) => {
  // Crear state inicial
  const initialState = {
    menu: [],
  };

  //useReducer con dispatch para ejecutar las funciones
  const [state, dispatch] = useReducer(FirebaseReducer, initialState);

  //Funcion que se ejecuta para traer productos
  const obtnerProductos = () => {
    dispatch({
      type: OBTNER_PRODUCTOS,
    });
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

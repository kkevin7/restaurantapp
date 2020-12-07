import React, {useReducer} from 'react';
import firebase from '../../firebase';
import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseConext';

const FirebaseState = props => {
    console.log(firebase);

    // Crear state inicial
    const initialState = {
        menu: []
    };

    //useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(FirebaseReducer, initialState);

    return(
        <FirebaseContext.Provider
            value={{
                firebase,
                menu: state.menu
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    );
}

export default FirebaseState;
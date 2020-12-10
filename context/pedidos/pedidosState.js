import React, {useReducer} from 'react';
import PedidosReducer from './pedidosReducer';
import PedidosContext from './pedidosContext';
//Actions Types
import {
    SELECCIONAR_PRODUCTO,
    CONFIRMAR_ORDENAR_PLATILLO,
    MOSTRAR_RESUMEN,
    ELIMINAR_PRODUCTO,
    PEDIDO_ORDENADO,
} from '../types';

const PedidosState = props => {

    // Crear state inicial
    const initialState = {
        pedido: [],
        platillo: null,
        total: 0,
        idPedido: '',
    };

    //useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(PedidosReducer, initialState);

    const seleccionarPlatillo = platillo => {
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: platillo
        });
    }

    const guardarPedido = pedido => {
        dispatch({
            type: CONFIRMAR_ORDENAR_PLATILLO,
            payload: pedido
        });
    }

    const mostrarResumen = total => {
        dispatch({
            type: MOSTRAR_RESUMEN,
            payload: total
        });
    }

    const eliminarProducto = id => {
        dispatch({
            type: ELIMINAR_PRODUCTO,
            payload: id
        });
    }

    const pedidoOrdenado = id => {
        dispatch({
            type: PEDIDO_ORDENADO,
            payload: id
        });
    }

    return(
        <PedidosContext.Provider
            value={{
                pedido: state.pedido,
                platillo: state.platillo,
                total: state.total,
                idPedido: state.idPedido,
                seleccionarPlatillo,
                guardarPedido,
                mostrarResumen,
                eliminarProducto,
                pedidoOrdenado,
            }}
        >
            {props.children}
        </PedidosContext.Provider>
    );
}

export default PedidosState;
import {act} from 'react-test-renderer';
import {SELECCIONAR_PRODUCTO, CONFIRMAR_ORDENAR_PLATILLO, MOSTRAR_RESUMEN, ELIMINAR_PRODUCTO} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SELECCIONAR_PRODUCTO:
      return {
        ...state,
        platillo: action.payload,
      };

    case CONFIRMAR_ORDENAR_PLATILLO:
      return {
        ...state,
        pedido: [...state.pedido, action.payload],
      };

    case MOSTRAR_RESUMEN:
        return{
            ...state,
            total: action.payload
        }

    case ELIMINAR_PRODUCTO:
        return {
            ...state,
            pedido: state.pedido.filter(articulo => articulo.id !== action.payload)
        }

    default:
      return state;
  }
};

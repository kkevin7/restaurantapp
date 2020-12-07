import React from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
//Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//Firebase
import FirebaseState from './context/firebase/firebaseState';
//Views
import NuevaOrden from './views/NuevaOrden';
import Menu from './views/Menu';
import DetallePlatillo from './views/DetallePlatillo';
import FormularioPlatillo from './views/FormularioPlatillo';
import ResumenPedido from './views/ResumenPedido';
import ProgresoPedido from './views/ProgresoPedido';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <FirebaseState>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#FFDA00',
              },
            }}>
            <Stack.Screen
              name="NuevaOrden"
              component={NuevaOrden}
              options={{
                title: 'Nueva Orden',
              }}
            />
            <Stack.Screen
              name="Menu"
              component={Menu}
              options={{
                title: 'Nuestro Menú',
              }}
            />
            <Stack.Screen
              name="DetallePlatillo"
              component={DetallePlatillo}
              options={{
                title: 'Detalle Platillo',
              }}
            />
            <Stack.Screen
              name="FormularioPlatillo"
              component={FormularioPlatillo}
              options={{
                title: 'Formulario Platillo',
              }}
            />
            <Stack.Screen
              name="ResumenPedido"
              component={ResumenPedido}
              options={{
                title: 'Resumen Pedido',
              }}
            />
            <Stack.Screen
              name="ProgresoPedido"
              component={ProgresoPedido}
              options={{
                title: 'Progreso Pedido',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FirebaseState>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;

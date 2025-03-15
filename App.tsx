import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuLogin from './screens/MenuLogin/MenuLogin';
import LoginDentista from './screens/LoginDentista/LoginDentista'; // Importa a nova tela
import LoginAtendente from './screens/LoginAtendente/LoginAtendente';
import MenuPrincipal from './screens/MenuPrincipal/MenuPrincipal';

// Define os parâmetros das rotas
type RootStackParamList = {
  MenuLogin: undefined;
  LoginDentista: undefined;
  LoginAtendente: undefined;
  MenuPrincipal: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MenuLogin">
        {/* Tela inicial */}
        <Stack.Screen
          name="MenuLogin"
          component={MenuLogin}
          options={{ headerShown: false }} // Desativa o cabeçalho
        />
        <Stack.Screen
          name="LoginDentista"
          component={LoginDentista}
          options={{ headerShown: false }} // Desativa o cabeçalho
        />
        <Stack.Screen
          name="LoginAtendente"
          component={LoginAtendente}
          options={{ headerShown: false }} // Desativa o cabeçalho
        />
        <Stack.Screen
          name="MenuPrincipal"
          component={MenuPrincipal}
          options={{ headerShown: false }} // Desativa o cabeçalho
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
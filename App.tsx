import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuLogin from './screens/MenuLogin/MenuLogin';
import LoginDentista from './screens/LoginDentista/LoginDentista'; // Importa a nova tela
import LoginAtendente from './screens/LoginAtendente/LoginAtendente';
import MenuPrincipal from './screens/MenuPrincipal/MenuPrincipal';
import CadastroAtendente from './screens/CadastroAtendente/CadastroAtendente';
import CadastroDentista from './screens/CadastroDentista/CadastroDentista';
import CadastroConcluido from './screens/CadastroConcluido/CadastroConcluido';
import ComoUsar from './screens/ComoUsar/ComoUsar';
import Configuracoes from './screens/Configuracoes/Configuracoes';

// Define os parâmetros das rotas
type RootStackParamList = {
  MenuLogin: undefined;
  LoginDentista: undefined;
  LoginAtendente: undefined;
  MenuPrincipal: undefined;
  CadastroAtendente: undefined;
  CadastroDentista: undefined;
  CadastroConcluido: undefined;
  ComoUsar: undefined;
  Configuracoes: undefined;
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
        <Stack.Screen
          name="CadastroAtendente"
          component={CadastroAtendente}
          options={{ headerShown: false }} // Desativa o cabeçalho
        />
        <Stack.Screen
          name="CadastroDentista"
          component={CadastroDentista}
          options={{ headerShown: false }} // Desativa o cabeçalho
        />
        <Stack.Screen
          name="CadastroConcluido"
          component={CadastroConcluido}
          options={{ headerShown: false }} // Desativa o cabeçalho
        />
        <Stack.Screen
          name="ComoUsar"
          component={ComoUsar}
          options={{ headerShown: false }} // Desativa o cabeçalho
        />
        <Stack.Screen
          name="Configuracoes"
          component={Configuracoes}
          options={{ headerShown: false }} // Desativa o cabeçalho
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
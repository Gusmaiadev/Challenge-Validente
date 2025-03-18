import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import MenuLogin from './screens/MenuLogin/MenuLogin';
import LoginDentista from './screens/LoginDentista/LoginDentista';
import LoginAtendente from './screens/LoginAtendente/LoginAtendente';
import MenuPrincipal from './screens/MenuPrincipal/MenuPrincipal';
import CadastroAtendente from './screens/CadastroAtendente/CadastroAtendente';
import CadastroDentista from './screens/CadastroDentista/CadastroDentista';
import CadastroConcluido from './screens/CadastroConcluido/CadastroConcluido';
import ComoUsar from './screens/ComoUsar/ComoUsar';
import Configuracoes from './screens/Configuracoes/Configuracoes';
import Consultas from './screens/Consultas/Consultas';
import AgendamentoConsultas from './screens/AgendamentoConsultas/AgendamentoConsultas';
import ConsultaPaciente from './screens/ConsultaPaciente/ConsultaPaciente';
import AnaliseConsulta from './screens/AnaliseConsulta/AnaliseConsulta';

export type RootStackParamList = {
  MenuLogin: undefined;
  LoginDentista: undefined;
  LoginAtendente: undefined;
  MenuPrincipal: { tipoUsuario?: string };
  CadastroAtendente: undefined;
  CadastroDentista: undefined;
  CadastroConcluido: { tipoUsuario?: string };
  ComoUsar: { tipoUsuario?: string };
  Configuracoes: undefined;
  Consultas: undefined;
  AgendamentoConsultas: undefined;
  ConsultaAgendada: undefined;
  ConsultaPaciente: undefined;
  AnaliseConsulta: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  // Carrega as fontes Montserrat
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  });

  // Aguarda o carregamento das fontes
  if (!fontsLoaded) {
    return null; // Ou um componente de loading
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="MenuLogin">
        <Stack.Screen
          name="MenuLogin"
          component={MenuLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginDentista"
          component={LoginDentista}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginAtendente"
          component={LoginAtendente}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MenuPrincipal"
          component={MenuPrincipal}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CadastroAtendente"
          component={CadastroAtendente}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CadastroDentista"
          component={CadastroDentista}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CadastroConcluido"
          component={CadastroConcluido}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ComoUsar"
          component={ComoUsar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Configuracoes"
          component={Configuracoes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Consultas"
          component={Consultas}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AgendamentoConsultas"
          component={AgendamentoConsultas}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConsultaPaciente"
          component={ConsultaPaciente}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AnaliseConsulta"
          component={AnaliseConsulta}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
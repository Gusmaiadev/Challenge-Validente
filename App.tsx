import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuLogin from './screens/MenuLogin/MenuLogin';

type RootStackParamList = {
  MenuLogin: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MenuLogin">
        <Stack.Screen
          name="MenuLogin"
          component={MenuLogin}
          options={{ headerShown: false }} // Desativa o cabeçalho
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
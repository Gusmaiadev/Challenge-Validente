import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define o tipo das rotas e seus parâmetros
export type RootStackParamList = {
  CadastroConcluido: { tipoUsuario: string }; // Parâmetro esperado na rota
  LoginAtendente: undefined; // Exemplo de outra rota sem parâmetros
  LoginDentista: undefined; // Exemplo de outra rota sem parâmetros
  MenuLogin: undefined; // Adicione outras rotas conforme necessário
};

// Tipagem da navegação e dos parâmetros da rota
export type CadastroConcluidoRouteProp = RouteProp<RootStackParamList, 'CadastroConcluido'>;
export type CadastroConcluidoNavigationProp = StackNavigationProp<RootStackParamList, 'CadastroConcluido'>;

// Props da tela
export type CadastroConcluidoProps = {
  route: CadastroConcluidoRouteProp;
  navigation: CadastroConcluidoNavigationProp;
};
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define o tipo das rotas e seus parâmetros
export type RootStackParamList = {
  CadastroConcluido: { tipoUsuario: string }; // Parâmetro esperado na rota
  ComoUsar: { tipoUsuario?: string }; // Rota "ComoUsar" com parâmetro opcional
  LoginAtendente: undefined; // Rota sem parâmetros
  LoginDentista: undefined; // Rota sem parâmetros
  MenuLogin: undefined; // Rota sem parâmetros
  MenuPrincipal: { tipoUsuario?: string }; // Rota com parâmetro opcional
  CadastroAtendente: undefined; // Rota sem parâmetros
  CadastroDentista: undefined; // Rota sem parâmetros
  AlterarSenha: { origem: string }; // Rota com parâmetro obrigatório
  Configuracoes: { tipoUsuario?: string }; // Rota "Configuracoes" com parâmetro opcional
  Consultas: { tipoUsuario?: string }; // Rota "Consultas" com parâmetro opcional
  ConsultaPaciente: {
    appointmentId: number;
    patientName: string;
    appointmentDate: string;
    appointmentTime: string;
    procedureType: string;
    clinic: string;
    tipoUsuario: string;
  }; // Rota "ConsultaPaciente" com parâmetros obrigatórios
};

// Tipagem da navegação e dos parâmetros da rota
export type ConsultaPacienteRouteProp = RouteProp<RootStackParamList, 'ConsultaPaciente'>;
export type ConsultaPacienteNavigationProp = StackNavigationProp<RootStackParamList, 'ConsultaPaciente'>;

export type ConsultasRouteProp = RouteProp<RootStackParamList, 'Consultas'>;
export type ConsultasNavigationProp = StackNavigationProp<RootStackParamList, 'Consultas'>;

export type ConfiguracoesRouteProp = RouteProp<RootStackParamList, 'Configuracoes'>;
export type ConfiguracoesNavigationProp = StackNavigationProp<RootStackParamList, 'Configuracoes'>;

export type LoginDentistaRouteProp = RouteProp<RootStackParamList, 'LoginDentista'>;
export type LoginDentistaNavigationProp = StackNavigationProp<RootStackParamList, 'LoginDentista'>;

export type ComoUsarRouteProp = RouteProp<RootStackParamList, 'ComoUsar'>;
export type ComoUsarNavigationProp = StackNavigationProp<RootStackParamList, 'ComoUsar'>;

export type LoginAtendenteRouteProp = RouteProp<RootStackParamList, 'LoginAtendente'>;
export type LoginAtendenteNavigationProp = StackNavigationProp<RootStackParamList, 'LoginAtendente'>;

export type MenuPrincipalRouteProp = RouteProp<RootStackParamList, 'MenuPrincipal'>;
export type MenuPrincipalNavigationProp = StackNavigationProp<RootStackParamList, 'MenuPrincipal'>;

// Props das telas
export type ComoUsarProps = {
  route: ComoUsarRouteProp;
  navigation: ComoUsarNavigationProp;
};

export type LoginAtendenteProps = {
  route: LoginAtendenteRouteProp;
  navigation: LoginAtendenteNavigationProp;
};

export type MenuPrincipalProps = {
  route: MenuPrincipalRouteProp;
  navigation: MenuPrincipalNavigationProp;
};

export type ConfiguracoesProps = {
  route: ConfiguracoesRouteProp;
  navigation: ConfiguracoesNavigationProp;
};

export type ConsultasProps = {
  route: ConsultasRouteProp;
  navigation: ConsultasNavigationProp;
};

export type ConsultaPacienteProps = {
  route: ConsultaPacienteRouteProp;
  navigation: ConsultaPacienteNavigationProp;
};
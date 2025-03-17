// navigationTypes.ts

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Tipagem genérica para os parâmetros das telas
export type RootStackParamList = {
  MenuPrincipal: { tipoUsuario: string }; // Adiciona o parâmetro tipoUsuario
  LoginAtendente: undefined;
  LoginDentista: undefined;
  CadastroAtendente: undefined;
  CadastroDentista: undefined;
  AlterarSenha: undefined;
  Consultas: undefined;
  AgendamentoConsulta: undefined;
  ConsultaPaciente: {
    appointmentId: number;
    patientName: string;
    appointmentDate: string;
    appointmentTime: string;
    procedureType: string;
    clinic: string;
    tipoUsuario: string;
  };
};

// Tipagens específicas para cada tela
export type MenuPrincipalNavigationProp = StackNavigationProp<RootStackParamList, 'MenuPrincipal'>;
export type MenuPrincipalRouteProp = RouteProp<RootStackParamList, 'MenuPrincipal'>;

export type LoginAtendenteNavigationProp = StackNavigationProp<RootStackParamList, 'LoginAtendente'>;
export type LoginAtendenteRouteProp = RouteProp<RootStackParamList, 'LoginAtendente'>;

export type LoginDentistaNavigationProp = StackNavigationProp<RootStackParamList, 'LoginDentista'>;
export type LoginDentistaRouteProp = RouteProp<RootStackParamList, 'LoginDentista'>;

export type CadastroAtendenteNavigationProp = StackNavigationProp<RootStackParamList, 'CadastroAtendente'>;
export type CadastroAtendenteRouteProp = RouteProp<RootStackParamList, 'CadastroAtendente'>;

export type CadastroDentistaNavigationProp = StackNavigationProp<RootStackParamList, 'CadastroDentista'>;
export type CadastroDentistaRouteProp = RouteProp<RootStackParamList, 'CadastroDentista'>;

export type AlterarSenhaNavigationProp = StackNavigationProp<RootStackParamList, 'AlterarSenha'>;
export type AlterarSenhaRouteProp = RouteProp<RootStackParamList, 'AlterarSenha'>;

export type ConsultasNavigationProp = StackNavigationProp<RootStackParamList, 'Consultas'>;
export type ConsultasRouteProp = RouteProp<RootStackParamList, 'Consultas'>;

export type AgendamentoConsultaNavigationProp = StackNavigationProp<RootStackParamList, 'AgendamentoConsulta'>;
export type AgendamentoConsultaRouteProp = RouteProp<RootStackParamList, 'AgendamentoConsulta'>;

export type ConsultaPacienteNavigationProp = StackNavigationProp<RootStackParamList, 'ConsultaPaciente'>;
export type ConsultaPacienteRouteProp = RouteProp<RootStackParamList, 'ConsultaPaciente'>;
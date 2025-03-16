import apiClient from './apiClient';

// Interface para a requisição de login
interface LoginRequest {
  email: string;
  password: string;
}

// Interface para a resposta de login
interface LoginResponse {
  token: string;
}

// Interface para a resposta de busca de clínicas
interface ClinicResponse {
  id: number;
  name: string;
}

// Interface para a requisição de cadastro de atendente
interface CadastroAtendenteRequest {
  email: string;
  password: string;
  name: string;
  rg: string;
  birthDate: string; // Formato: yyyy-MM-dd
  role: string; // Pré-definido como "ATENDENTE"
  clinicId: number;
}

// Interface para a requisição de cadastro de dentista
interface CadastroDentistaRequest {
  email: string;
  password: string;
  name: string;
  rg: string;
  birthDate: string; // Formato: yyyy-MM-dd
  cro: string;
  role: string; // Pré-definido como "DENTISTA"
  clinicId: number;
}

// Função para realizar login
export const realizarLogin = async (email: string, senha: string): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>('/auth/login', {
      email,
      password: senha,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Função para buscar clínicas
export const buscarClinicas = async (): Promise<ClinicResponse[]> => {
  try {
    const response = await apiClient.get<ClinicResponse[]>('/clinics');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Função para cadastrar atendentes
export const cadastrarAtendente = async (dados: CadastroAtendenteRequest): Promise<void> => {
  try {
    await apiClient.post('/auth/signup', dados);
  } catch (error) {
    throw error;
  }
};

// Função para cadastrar dentistas
export const cadastrarDentista = async (dados: CadastroDentistaRequest): Promise<void> => {
  try {
    await apiClient.post('/auth/signup', dados);
  } catch (error) {
    throw error;
  }
};
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
    const response = await apiClient.post<LoginResponse>('/auth/login', { email, password: senha });

    // Verifica se a resposta foi bem-sucedida
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw { message: `Erro inesperado: ${response.status}`, status: response.status };
    }
  } catch (error: any) {
    // Tratamento de erros baseado no código HTTP
    if (error.response) {
      const statusCode = error.response.status;

      let errorMessage = '';
      switch (statusCode) {
        case 400:
          errorMessage = 'Dados inválidos';
          break;
        case 401:
        case 404: // Trata o erro 404 como "Email ou senha incorretos"
          errorMessage = 'Email ou senha incorretos';
          break;
        case 403:
          errorMessage = 'Acesso não autorizado';
          break;
        case 500:
          errorMessage = 'Erro interno do servidor';
          break;
        default:
          errorMessage = `Erro no login: ${statusCode}`;
      }

      // Lança um erro personalizado com o código HTTP
      throw { message: errorMessage, status: statusCode };
    } else if (error.request) {
      // Ocorreu um erro de conexão (ex.: servidor offline)
      throw { message: 'Erro de conexão: Não foi possível conectar ao servidor' };
    } else {
      // Outro tipo de erro
      throw { message: `Erro desconhecido: ${error.message}` };
    }
  }
};

// Função para buscar clínicas
export const buscarClinicas = async (): Promise<ClinicResponse[]> => {
  try {
    const response = await apiClient.get<ClinicResponse[]>('/clinics');

    // Verifica se a resposta foi bem-sucedida
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw { message: `Erro inesperado: ${response.status}`, status: response.status };
    }
  } catch (error: any) {
    // Tratamento de erros baseado no código HTTP
    if (error.response) {
      const statusCode = error.response.status;

      let errorMessage = '';
      switch (statusCode) {
        case 400:
          errorMessage = 'Requisição inválida';
          break;
        case 403:
          errorMessage = 'Acesso não autorizado';
          break;
        case 500:
          errorMessage = 'Erro interno do servidor';
          break;
        default:
          errorMessage = `Erro ao buscar clínicas: ${statusCode}`;
      }

      // Lança um erro personalizado com o código HTTP
      throw { message: errorMessage, status: statusCode };
    } else if (error.request) {
      // Ocorreu um erro de conexão (ex.: servidor offline)
      throw { message: 'Erro de conexão: Não foi possível conectar ao servidor' };
    } else {
      // Outro tipo de erro
      throw { message: `Erro desconhecido: ${error.message}` };
    }
  }
};

// Função para cadastrar atendentes
export const cadastrarAtendente = async (dados: CadastroAtendenteRequest): Promise<void> => {
  try {
    const response = await apiClient.post('/auth/signup', dados);

    // Verifica se a resposta foi bem-sucedida
    if (response.status !== 201) {
      throw { message: `Erro inesperado: ${response.status}`, status: response.status };
    }
  } catch (error: any) {
    // Tratamento de erros baseado no código HTTP
    if (error.response) {
      const statusCode = error.response.status;

      let errorMessage = '';
      switch (statusCode) {
        case 400:
          errorMessage = 'Dados inválidos';
          break;
        case 403:
          errorMessage = 'Acesso não autorizado';
          break;
        case 500:
          errorMessage = 'Erro interno do servidor';
          break;
        default:
          errorMessage = `Erro ao cadastrar atendente: ${statusCode}`;
      }

      // Lança um erro personalizado com o código HTTP
      throw { message: errorMessage, status: statusCode };
    } else if (error.request) {
      // Ocorreu um erro de conexão (ex.: servidor offline)
      throw { message: 'Erro de conexão: Não foi possível conectar ao servidor' };
    } else {
      // Outro tipo de erro
      throw { message: `Erro desconhecido: ${error.message}` };
    }
  }
};

// Função para cadastrar dentistas
export const cadastrarDentista = async (dados: CadastroDentistaRequest): Promise<void> => {
  try {
    const response = await apiClient.post('/auth/signup', dados);

    // Verifica se a resposta foi bem-sucedida
    if (response.status !== 201) {
      throw { message: `Erro inesperado: ${response.status}`, status: response.status };
    }
  } catch (error: any) {
    // Tratamento de erros baseado no código HTTP
    if (error.response) {
      const statusCode = error.response.status;

      let errorMessage = '';
      switch (statusCode) {
        case 400:
          errorMessage = 'Dados inválidos';
          break;
        case 403:
          errorMessage = 'Acesso não autorizado';
          break;
        case 500:
          errorMessage = 'Erro interno do servidor';
          break;
        default:
          errorMessage = `Erro ao cadastrar dentista: ${statusCode}`;
      }

      // Lança um erro personalizado com o código HTTP
      throw { message: errorMessage, status: statusCode };
    } else if (error.request) {
      // Ocorreu um erro de conexão (ex.: servidor offline)
      throw { message: 'Erro de conexão: Não foi possível conectar ao servidor' };
    } else {
      // Outro tipo de erro
      throw { message: `Erro desconhecido: ${error.message}` };
    }
  }
};
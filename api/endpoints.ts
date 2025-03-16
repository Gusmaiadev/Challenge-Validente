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
      throw new Error(`Erro inesperado: ${response.status}`);
    }
  } catch (error: any) {
    // Tratamento de erros baseado no código HTTP
    if (error.response) {
      const statusCode = error.response.status;

      switch (statusCode) {
        case 400:
          throw new Error('Dados inválidos');
        case 401:
        case 404: // Trata o erro 404 como "Email ou senha incorretos"
          throw new Error('Email ou senha incorretos');
        case 403:
          throw new Error('Acesso não autorizado');
        case 500:
          throw new Error('Erro interno do servidor');
        default:
          throw new Error(`Erro no login: ${statusCode}`);
      }
    } else if (error.request) {
      // Ocorreu um erro de conexão (ex.: servidor offline)
      throw new Error('Erro de conexão: Não foi possível conectar ao servidor');
    } else {
      // Outro tipo de erro
      throw new Error(`Erro desconhecido: ${error.message}`);
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
      throw new Error(`Erro inesperado: ${response.status}`);
    }
  } catch (error: any) {
    // Tratamento de erros baseado no código HTTP
    if (error.response) {
      const statusCode = error.response.status;

      switch (statusCode) {
        case 400:
          throw new Error('Requisição inválida');
        case 403:
          throw new Error('Acesso não autorizado');
        case 500:
          throw new Error('Erro interno do servidor');
        default:
          throw new Error(`Erro ao buscar clínicas: ${statusCode}`);
      }
    } else if (error.request) {
      // Ocorreu um erro de conexão (ex.: servidor offline)
      throw new Error('Erro de conexão: Não foi possível conectar ao servidor');
    } else {
      // Outro tipo de erro
      throw new Error(`Erro desconhecido: ${error.message}`);
    }
  }
};

// Função para cadastrar atendentes
export const cadastrarAtendente = async (dados: CadastroAtendenteRequest): Promise<void> => {
  try {
    const response = await apiClient.post('/auth/signup', dados);

    // Verifica se a resposta foi bem-sucedida
    if (response.status !== 201) {
      throw new Error(`Erro inesperado: ${response.status}`);
    }
  } catch (error: any) {
    // Tratamento de erros baseado no código HTTP
    if (error.response) {
      const statusCode = error.response.status;

      switch (statusCode) {
        case 400:
          throw new Error('Dados inválidos');
        case 403:
          throw new Error('Acesso não autorizado');
        case 500:
          throw new Error('Erro interno do servidor');
        default:
          throw new Error(`Erro ao cadastrar atendente: ${statusCode}`);
      }
    } else if (error.request) {
      // Ocorreu um erro de conexão (ex.: servidor offline)
      throw new Error('Erro de conexão: Não foi possível conectar ao servidor');
    } else {
      // Outro tipo de erro
      throw new Error(`Erro desconhecido: ${error.message}`);
    }
  }
};

// Função para cadastrar dentistas
export const cadastrarDentista = async (dados: CadastroDentistaRequest): Promise<void> => {
  try {
    const response = await apiClient.post('/auth/signup', dados);

    // Verifica se a resposta foi bem-sucedida
    if (response.status !== 201) {
      throw new Error(`Erro inesperado: ${response.status}`);
    }
  } catch (error: any) {
    // Tratamento de erros baseado no código HTTP
    if (error.response) {
      const statusCode = error.response.status;

      switch (statusCode) {
        case 400:
          throw new Error('Dados inválidos');
        case 403:
          throw new Error('Acesso não autorizado');
        case 500:
          throw new Error('Erro interno do servidor');
        default:
          throw new Error(`Erro ao cadastrar dentista: ${statusCode}`);
      }
    } else if (error.request) {
      // Ocorreu um erro de conexão (ex.: servidor offline)
      throw new Error('Erro de conexão: Não foi possível conectar ao servidor');
    } else {
      // Outro tipo de erro
      throw new Error(`Erro desconhecido: ${error.message}`);
    }
  }
};

// Função para buscar consultas
export const fetchAppointments = async (): Promise<any[]> => {
  try {
    const response = await apiClient.get('/appointments');

    // Verifica se a resposta foi bem-sucedida
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error(`Erro inesperado: ${response.status}`);
    }
  } catch (error: any) {
    // Tratamento de erros baseado no código HTTP
    if (error.response) {
      const statusCode = error.response.status;

      switch (statusCode) {
        case 400:
          throw new Error('Requisição inválida');
        case 403:
          throw new Error('Acesso não autorizado');
        case 500:
          throw new Error('Erro interno do servidor');
        default:
          throw new Error(`Erro ao carregar consultas: ${statusCode}`);
      }
    } else if (error.request) {
      // Ocorreu um erro de conexão (ex.: servidor offline)
      throw new Error('Erro de conexão: Não foi possível conectar ao servidor');
    } else {
      // Outro tipo de erro
      throw new Error(`Erro desconhecido: ${error.message}`);
    }
  }
};
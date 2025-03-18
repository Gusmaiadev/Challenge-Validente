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

// Interface para a requisição de cadastro de paciente
interface PatientRequest {
  name: string;
  rg: string;
  birthDate: string; // Formato: yyyy-MM-dd
  numCard: number;
}

// Interface para a resposta de busca de paciente
interface PatientResponse {
  id: number;
  name: string;
  rg: string;
  birthDate: string; // Formato: yyyy-MM-dd
  numCard: number;
}

// Interface para a requisição de agendamento
interface AppointmentRequest {
  dateAppointment: string; // Formato: dd/MM/yyyy
  timeAppointment: string; // Formato: HH:mm
  dentistId: number;
  patientId: number;
  procedureTypeId: number;
}

// Interface para a resposta de listagem de consultas
interface AppointmentListResponse {
  id: number;
  patient: string;
  dateAppointment: string; // Formato: dd/MM/yyyy
  timeAppointment: string; // Formato: HH:mm
  procedureType: string;
  clinic: string;
}

// Função para realizar login
export const realizarLogin = async (email: string, senha: string): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>('/auth/login', { email, password: senha });
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error(`Erro inesperado: ${response.status}`);
    }
  } catch (error: any) {
    if (error.response) {
      const statusCode = error.response.status;
      switch (statusCode) {
        case 400:
          throw new Error('Dados inválidos');
        case 401:
          throw new Error('Email ou senha incorretos');
        case 403:
          throw new Error('Acesso não autorizado');
        case 404:
          throw new Error('Email ou senha incorretos');
        case 500:
          throw new Error('Erro interno do servidor');
        default:
          throw new Error(`Erro no login: ${statusCode}`);
      }
    } else if (error.request) {
      throw new Error('Erro de conexão: Não foi possível conectar ao servidor');
    } else {
      throw new Error(`Erro desconhecido: ${error.message}`);
    }
  }
};

export const buscarConsultaPorID = async (appointmentId: number) => {
  try {
    const response = await apiClient.get(`/appointments/${appointmentId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao buscar consulta');
  }
};



// Iniciar consulta
export const iniciarConsulta = async (appointmentId: number) => {
  try {
    const response = await apiClient.post(`/appointments/${appointmentId}/start`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao iniciar consulta');
  }
};

// Função para buscar clínicas
export const buscarClinicas = async (): Promise<ClinicResponse[]> => {
  try {
    const response = await apiClient.get<ClinicResponse[]>('/clinics');
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error(`Erro inesperado: ${response.status}`);
    }
  } catch (error: any) {
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
      throw new Error('Erro de conexão: Não foi possível conectar ao servidor');
    } else {
      throw new Error(`Erro desconhecido: ${error.message}`);
    }
  }
};

// Função para cadastrar atendentes
export const cadastrarAtendente = async (dados: CadastroAtendenteRequest): Promise<void> => {
  try {
    const response = await apiClient.post('/auth/signup', dados);
    if (response.status !== 201) {
      throw new Error(`Erro inesperado: ${response.status}`);
    }
  } catch (error: any) {
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
      throw new Error('Erro de conexão: Não foi possível conectar ao servidor');
    } else {
      throw new Error(`Erro desconhecido: ${error.message}`);
    }
  }
};

// Função para cadastrar dentistas
export const cadastrarDentista = async (dados: CadastroDentistaRequest): Promise<void> => {
  try {
    const response = await apiClient.post('/auth/signup', dados);
    if (response.status !== 201) {
      throw new Error(`Erro inesperado: ${response.status}`);
    }
  } catch (error: any) {
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
      throw new Error('Erro de conexão: Não foi possível conectar ao servidor');
    } else {
      throw new Error(`Erro desconhecido: ${error.message}`);
    }
  }
};

// Função para buscar procedimentos
export const buscarProcedimentos = async (): Promise<any[]> => {
  try {
    const response = await apiClient.get('/proceduresType');
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao buscar procedimentos');
  }
};

// Função para buscar dentistas
export const buscarDentistas = async (): Promise<any[]> => {
  try {
    const response = await apiClient.get('/auth?role=DENTISTA');
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao buscar dentistas');
  }
};

// Função para buscar paciente por RG
export const buscarPacientePorRG = async (rg: string): Promise<any> => {
  try {
    const response = await apiClient.get(`/patients/${rg}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Paciente não encontrado');
  }
};

// Função para criar um novo paciente
export const criarPaciente = async (dados: any): Promise<any> => {
  try {
    const response = await apiClient.post('/patients', dados);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao criar paciente');
  }
};

// Função para agendar uma consulta
export const agendarConsulta = async (dados: any): Promise<any> => {
  try {
    const response = await apiClient.post('/appointments', dados);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao agendar consulta');
  }
};

// Função para buscar consultas
export const fetchAppointments = async (): Promise<AppointmentListResponse[]> => {
  try {
    const response = await apiClient.get('/appointments');
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao buscar consultas');
  }
};
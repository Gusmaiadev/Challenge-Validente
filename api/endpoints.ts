import apiClient from './apiClient';

// Interfaces atualizadas
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface ClinicResponse {
  id: number;
  name: string;
}

interface CadastroAtendenteRequest {
  email: string;
  password: string;
  name: string;
  rg: string;
  birthDate: string;
  role: string;
  clinicId: number;
}

interface CadastroDentistaRequest {
  email: string;
  password: string;
  name: string;
  rg: string;
  birthDate: string;
  cro: string;
  role: string;
  clinicId: number;
}

interface PatientRequest {
  name: string;
  rg: string;
  birthDate: string;
  numCard: number;
}

interface AppointmentRequest {
  dateAppointment: string;
  timeAppointment: string;
  dentistId: number;
  patientId: number;
  procedureTypeId: number;
  clinicId: number;
  procedureValidationId?: number;
}

interface AppointmentListResponse {
  id: number;
  patient: string;
  dateAppointment: string;
  timeAppointment: string;
  procedureType: string;
  clinic: string;
}

// Nova função para validar a consulta com fotos
export const validarConsulta = async (
  appointmentId: number,
  fotoInicial: string,
  fotoFinal: string
) => {
  try {
    // Criar FormData para enviar arquivos
    const formData = new FormData();
    
    // Adicionar o arquivo de foto inicial
    formData.append('fileStart', {
      uri: fotoInicial,
      name: fotoInicial.split('/').pop() || 'fotoInicial.jpg',
      type: 'image/jpeg'
    } as any);
    
    // Adicionar o arquivo de foto final
    formData.append('fileEnd', {
      uri: fotoFinal,
      name: fotoFinal.split('/').pop() || 'fotoFinal.jpg',
      type: 'image/jpeg'
    } as any);
    
    // Enviar requisição POST com os arquivos
    const response = await apiClient.post(
      `/appointments/${appointmentId}/validate`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Erro ao validar consulta'
    );
  }
};

// Nova função para buscar consultas com status específico
export const fetchAppointmentsByStatus = async (status: string): Promise<AppointmentListResponse[]> => {
  try {
    const response = await apiClient.get(`/appointments/status?status=${status}`);
    return response.data;
  } catch (error: any) {
    handleApiError(error, `buscar consultas com status ${status}`);
    throw error;
  }
};

// Funções de API atualizadas
export const realizarLogin = async (email: string, senha: string): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>('/auth/login', { email, password: senha });
    return response.data;
  } catch (error: any) {
    handleApiError(error, 'login');
    throw error;
  }
};

export const excluirConsulta = async (appointmentId: number): Promise<void> => {
  try {
    await apiClient.delete(`/appointments/${appointmentId}`);
  } catch (error: any) {
    handleApiError(error, 'excluir consulta');
    throw error;
  }
};

export const alterarConsulta = async (appointmentId: number, dados: any) => {
  try {
    const response = await apiClient.patch(`/appointments/${appointmentId}`, dados);
    return response.data;
  } catch (error: any) {
    handleApiError(error, 'alterar consulta');
    throw error;
  }
};

export const buscarClinicas = async (): Promise<ClinicResponse[]> => {
  try {
    const response = await apiClient.get<ClinicResponse[]>('/clinics');
    return response.data;
  } catch (error: any) {
    handleApiError(error, 'buscar clínicas');
    throw error;
  }
};

export const cadastrarAtendente = async (dados: CadastroAtendenteRequest): Promise<void> => {
  try {
    await apiClient.post('/auth/signup', dados);
  } catch (error: any) {
    handleApiError(error, 'cadastrar atendente');
    throw error;
  }
};

export const cadastrarDentista = async (dados: CadastroDentistaRequest): Promise<void> => {
  try {
    await apiClient.post('/auth/signup', dados);
  } catch (error: any) {
    handleApiError(error, 'cadastrar dentista');
    throw error;
  }
};

export const buscarProcedimentos = async (): Promise<any[]> => {
  try {
    const response = await apiClient.get('/proceduresType');
    return response.data;
  } catch (error: any) {
    handleApiError(error, 'buscar procedimentos');
    throw error;
  }
};

export const buscarDentistas = async (): Promise<any[]> => {
  try {
    const response = await apiClient.get('/auth?role=DENTISTA');
    return response.data;
  } catch (error: any) {
    handleApiError(error, 'buscar dentistas');
    throw error;
  }
};

export const buscarPacientePorRG = async (rg: string): Promise<any> => {
  try {
    const response = await apiClient.get(`/patients/${rg}`);
    return response.data;
  } catch (error: any) {
    handleApiError(error, 'buscar paciente');
    throw error;
  }
};

export const criarPaciente = async (dados: PatientRequest): Promise<any> => {
  try {
    const response = await apiClient.post('/patients', dados);
    return response.data;
  } catch (error: any) {
    handleApiError(error, 'criar paciente');
    throw error;
  }
};

export const agendarConsulta = async (dados: AppointmentRequest): Promise<any> => {
  try {
    const response = await apiClient.post('/appointments', dados);
    return response.data;
  } catch (error: any) {
    handleApiError(error, 'agendar consulta');
    throw error;
  }
};

export const fetchAppointments = async (): Promise<AppointmentListResponse[]> => {
  try {
    const response = await apiClient.get('/appointments');
    return response.data;
  } catch (error: any) {
    handleApiError(error, 'buscar consultas');
    throw error;
  }
};

export const fetchAppointmentsByOdontoPrevId = async (patientId: string): Promise<AppointmentListResponse[]> => {
  try {
    const response = await apiClient.get(`/appointments/byPatientIdOdontoPrev/${patientId}`);
    return response.data;
  } catch (error: any) {
    handleApiError(error, 'buscar consultas por ID Odontoprev');
    throw error;
  }
};

// Função auxiliar para tratamento de erros
const handleApiError = (error: any, context: string) => {
  let errorMessage = `Erro ao ${context}`;
  
  if (error.response) {
    const { status, data } = error.response;
    errorMessage += `: ${status} - ${data.message || 'Erro desconhecido'}`;
  } else if (error.request) {
    errorMessage += ': Sem resposta do servidor';
  } else {
    errorMessage += `: ${error.message}`;
  }
  
  // Remove o console.error original e não lança nova exceção
  return errorMessage; // Retorna apenas a mensagem
};

// Funções adicionais
export const buscarConsultaPorID = async (appointmentId: number) => {
  try {
    const response = await apiClient.get(`/appointments/${appointmentId}`);
    return response.data;
  } catch (error: any) {
    handleApiError(error, 'buscar consulta por ID');
    throw error;
  }
};
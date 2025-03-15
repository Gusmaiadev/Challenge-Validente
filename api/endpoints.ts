import apiClient from './apiClient';

interface LoginRequest {
  email: string;
  password: string; 
}

interface LoginResponse {
  token: string;
}

export const realizarLogin = async (email: string, senha: string): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>('/auth/login', { 
      email, 
      password: senha 
    });
    return response.data;
  } catch (error) {
    throw error; 
  }
};
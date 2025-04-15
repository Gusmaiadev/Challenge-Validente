import axios, { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://192.168.0.6:8080'; // Substitua pelo IP correto se necessário

// Instância com autenticação
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

// Interceptador de requisição para adicionar o token
apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');

  // Lista de endpoints que NÃO exigem autenticação
  const publicEndpoints = ['/auth/login', '/auth/signup', '/clinics'];

  // Verifica se o endpoint atual está na lista de endpoints públicos
  const isPublicEndpoint = publicEndpoints.some((endpoint) => config.url?.includes(endpoint));

  // Adiciona o token apenas se o endpoint não for público
  if (token && !isPublicEndpoint) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;
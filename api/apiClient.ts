import axios, { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://10.0.2.2:8080'; // Substitua pelo IP correto se necessário

// Instância com autenticação
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

// Interceptador de requisição para adicionar o token
apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token && !config.url?.endsWith('/auth/login') && !config.url?.endsWith('/clinics')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;


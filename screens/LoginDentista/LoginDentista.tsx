import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import { realizarLogin } from '../../api/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './LoginDentista.styles';
import { LoginDentistaNavigationProp } from '../../src/navigation/navigationTypes';

const LoginDentista: React.FC = () => {
  const navigation = useNavigation<LoginDentistaNavigationProp>();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Função para validar os campos de login
  const validarCampos = (): boolean => {
    if (!email.trim() || !senha.trim()) {
      showAlert('Erro', 'Preencha todos os campos');
      return false;
    }
    if (!isValidEmail(email)) {
      showAlert('Erro', 'Email inválido');
      return false;
    }
    return true;
  };

  // Função para verificar se o email é válido
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função para lidar com o login
  const handleLogin = async () => {
    if (!validarCampos()) return;

    setIsLoading(true);
    try {
      const response = await realizarLogin(email, senha);
      const { token } = response;

      // Salvar token e tipo de usuário no AsyncStorage
      await saveUserData(token);

      // Navegar para a tela MenuPrincipal
      navigation.navigate('MenuPrincipal', { tipoUsuario: 'dentista' });
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);

      // Tratamento de erros específicos
      let errorMessage = 'Erro desconhecido';
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message; // Exibe a mensagem do erro personalizado
      } else if (error?.message) {
        errorMessage = error.message; // Fallback para mensagens genéricas
      }

      showAlert('Erro no login', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para salvar dados do usuário no AsyncStorage
  const saveUserData = async (token: string) => {
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('tipoUsuario', 'dentista');
    } catch (error) {
      console.error('Erro ao salvar dados no AsyncStorage:', error);
    }
  };

  // Função para exibir alertas
  const showAlert = (title: string, message: string) => {
    Alert.alert(title, message, [{ text: 'OK' }]);
  };

  return (
    <View style={styles.container}>
      {/* ProgressBar */}
      {isLoading && (
        <View style={styles.progressBar}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}

      {/* Imagem superior */}
      <Image
        source={require('../../assets/icone.png')} // Substitua pelo caminho correto do ícone
        style={styles.topImage}
      />

      {/* Ícone Dentista */}
      <Image
        source={require('../../assets/iconedentista.png')} // Substitua pelo caminho correto do ícone
        style={styles.dentistIcon}
      />

      {/* Título */}
      <Text style={styles.title}>Login Dentista</Text>

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {/* Botões */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>

      {/* Links */}
      <TouchableOpacity onPress={() => navigation.navigate('CadastroDentista')}>
        <Text style={styles.linkText}>Não possui cadastro? Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AlterarSenha', { origem: 'dentista' })}>
        <Text style={styles.linkText}>Esqueci minha senha</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginDentista;
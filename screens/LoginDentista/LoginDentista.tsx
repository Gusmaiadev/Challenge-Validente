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
  const [showPassword, setShowPassword] = useState(false);
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
      {/* Botão Voltar */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}>
        <Image
          source={require('../../assets/vol.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require('../../assets/odontoprev-logo.png')}
        style={styles.logo}
      />

        <View style={styles.registerContainer}>
          <Text style={styles.title}>Login Dentista</Text>
        </View>

      {/* Formulário */}
      <View style={styles.form}>
        {/* Campo E-mail */}
        <Text style={styles.inputLabel}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira seu E-mail"
          placeholderTextColor="#717171"
          value={email}
          onChangeText={setEmail}
        />

        {/* Campo Senha */}
        <Text style={styles.inputLabel}>Senha</Text>
        <View style={styles.passwordInput}>
          <TextInput
            style={styles.input}
            placeholder="Insira sua senha"
            placeholderTextColor="#717171"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}>
            <Image
              source={require('../../assets/eye-icon.png')}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Esqueci Senha */}
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
        </TouchableOpacity>

        {/* Botão Entrar */}
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Cadastro */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Não possui cadastro?</Text>
          <TouchableOpacity 
            style={styles.registerButton}
            onPress={() => navigation.navigate('CadastroDentista')} // Adicione esta linha
          >
            <Text style={styles.registerButtonText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Loading */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0066FF" />
        </View>
      )}
    </View>
  );
};

export default LoginDentista;
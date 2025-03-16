import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { realizarLogin } from '../../api/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './LoginAtendente.styles';

const LoginAtendente: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const senhaRef = useRef<TextInput | null>(null);

  const handleLogin = async () => {
    console.log('Iniciando o processo de login...');
    setIsLoading(true);
    console.log('Chamando a API para realizar o login...');

    try {
      const response = await realizarLogin(email, senha);
      console.log('Resposta da API recebida:', response);

      const { token } = response;

      // Salvar token e tipo de usuário no AsyncStorage
      await saveUserData(token);
      console.log('Token salvo no AsyncStorage.');

      // Navegar para a tela MenuPrincipal
      console.log('Navegando para a tela MenuPrincipal...');
      navigation.navigate('MenuPrincipal' as never);
    } catch (error) {
      console.error('Erro ao fazer login:', error);

      let errorMessage = 'Erro desconhecido';

      if (
        error &&
        typeof error === 'object' &&
        'response' in error &&
        error.response &&
        typeof error.response === 'object'
      ) {
        console.log('Resposta completa do erro da API:', error.response);

        if ('data' in error.response && typeof error.response.data === 'object' && error.response.data !== null) {
          const data = error.response.data as { message?: string };
          errorMessage = data.message || errorMessage;
          console.log('Mensagem de erro extraída da resposta da API:', errorMessage);
        }
      }

      showAlert('Erro no login', errorMessage);
    } finally {
      setIsLoading(false);
      console.log('Processo de login finalizado.');
    }
  };

  const saveUserData = async (token: string) => {
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('tipoUsuario', 'atendente');
      console.log('Dados do usuário salvos no AsyncStorage.');
    } catch (error) {
      console.error('Erro ao salvar dados no AsyncStorage:', error);
    }
  };

  const showAlert = (title: string, message: string) => {
    console.log(`Exibindo alerta: ${title} - ${message}`);
    Alert.alert(title, message, [{ text: 'OK' }]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Comportamento específico para iOS e Android
      enabled>
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

        {/* Ícone Atendente */}
        <Image
          source={require('../../assets/iconeatendente.png')} // Substitua pelo caminho correto do ícone
          style={styles.atendenteIcon}
        />

        {/* Título */}
        <Text style={styles.title}>Login Atendente</Text>

        {/* Inputs */}
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next" // Move o foco para o próximo campo
          onSubmitEditing={() => senhaRef.current?.focus()} // Move o foco para o campo de senha
          onFocus={() => console.log('Campo de e-mail recebeu foco')} // Log para depuração
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          ref={senhaRef} // Referência para o campo de senha
          returnKeyType="done" // Define o botão "Concluir" no teclado
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
        <TouchableOpacity onPress={() => navigation.navigate('CadastroAtendente' as never)}>
          <Text style={styles.linkText}>Não possui cadastro? Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AlterarSenha' as never)}>
          <Text style={styles.linkText}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginAtendente; 
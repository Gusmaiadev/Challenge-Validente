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

const LoginDentista: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Função handleLogin com logs de depuração
  const handleLogin = async () => {
    console.log('Iniciando o processo de login...');

    if (!validarCampos()) {
      console.log('Validação de campos falhou.');
      return;
    }

    setIsLoading(true);
    console.log('Campos validados. Chamando a API para realizar o login...');

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
        typeof error.response === 'object' &&
        'data' in error.response
      ) {
        const data = error.response.data as { message?: string };
        errorMessage = data.message || errorMessage;
        console.log('Mensagem de erro extraída da resposta da API:', errorMessage);
      }

      showAlert('Erro no login', errorMessage);
    } finally {
      setIsLoading(false);
      console.log('Processo de login finalizado.');
    }
  };

  const validarCampos = (): boolean => {
    if (!email.trim() || !senha.trim()) {
      console.log('Erro: Campos de email ou senha estão vazios.');
      showAlert('Erro', 'Preencha todos os campos');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Erro: Email inválido.');
      showAlert('Erro', 'Email inválido');
      return false;
    }

    console.log('Campos validados com sucesso.');
    return true;
  };

  const saveUserData = async (token: string) => {
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('tipoUsuario', 'dentista');
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
      <TouchableOpacity onPress={() => navigation.navigate('CadastroDentista' as never)}>
        <Text style={styles.linkText}>Não possui cadastro? Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AlterarSenha' as never)}>
        <Text style={styles.linkText}>Esqueci minha senha</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginDentista;
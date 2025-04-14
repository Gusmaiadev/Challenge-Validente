import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  Dimensions,
  Modal
} from 'react-native';
import { realizarLogin } from '../../api/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './LoginAtendente.styles';
import { LoginAtendenteNavigationProp } from '../../src/navigation/navigationTypes';

const { height } = Dimensions.get('window');

const LoginAtendente: React.FC = () => {
  const navigation = useNavigation<LoginAtendenteNavigationProp>();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await realizarLogin(email, senha);
      const { token } = response;

      await saveUserData(token);
      navigation.navigate('MenuPrincipal', { tipoUsuario: 'atendente' });
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserData = async (token: string) => {
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('tipoUsuario', 'atendente');
    } catch (error) {
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require('../../assets/vol.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <Image
          source={require('../../assets/odontoprev-logo.png')}
          style={styles.logo}
        />

        <View style={styles.header}>
          <Text style={styles.title}>Login Atendente</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.inputLabel}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Insira seu E-mail"
            placeholderTextColor="#717171"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

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
              style={styles.eyeButton}
            >
              <Image
                source={require('../../assets/eye-icon.png')}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Não possui cadastro?</Text>
            <TouchableOpacity 
              style={styles.registerButton}
              onPress={() => navigation.navigate('CadastroAtendente')}
            >
              <Text style={styles.registerButtonText}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={showErrorModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowErrorModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalEmoji}>😟</Text>
            <Text style={styles.modalTitle}>Ops!</Text>
            <Text style={styles.modalText}>{errorMessage}</Text>
            
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => setShowErrorModal(false)}
            >
              <Text style={styles.modalButtonText}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0066FF" />
        </View>
      )}
    </View>
  );
};

export default LoginAtendente;
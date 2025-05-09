import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import apiClient from '../../api/apiClient';
import styles from './CadastroAtendente.styles';

interface Clinic {
  id: number;
  name: string;
}

const CadastroAtendente: React.FC = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [selectedClinic, setSelectedClinic] = useState<number | null>(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [rg, setRg] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Buscar clínicas ao carregar a tela
  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/clinics');
      setClinics(response.data);
    } catch (error) {
      console.error('Erro ao buscar clínicas:', error);
      Alert.alert('Erro', 'Não foi possível carregar as clínicas.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCadastro = async () => {
    if (!validateFields()) return;

    try {
      setIsLoading(true);

      // Formatar data para yyyy-MM-dd
      const formattedDate = formatDateForAPI(dataNascimento);

      // Enviar requisição para cadastrar atendente
      await apiClient.post('/auth/signup', {
        email,
        password: senha,
        name: nome,
        rg,
        birthDate: formattedDate,
        role: 'ATENDENTE', // Role pré-definido
        clinicId: selectedClinic,
      });

      // Navegar para a tela de cadastro concluído
      navigation.navigate('CadastroConcluido' as never);
    } catch (error) {
      console.error('Erro ao cadastrar atendente:', error);
      Alert.alert('Erro', 'Não foi possível realizar o cadastro.');
    } finally {
      setIsLoading(false);
    }
  };

  const validateFields = (): boolean => {
    if (!nome || !email || !senha || !rg || !dataNascimento || !selectedClinic) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return false;
    }

    if (!isValidDate(dataNascimento)) {
      Alert.alert('Erro', 'Data de nascimento inválida. Use o formato DD/MM/AAAA.');
      return false;
    }

    return true;
  };

  const isValidDate = (date: string): boolean => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(date)) return false;

    const [day, month, year] = date.split('/').map(Number);
    const dateObj = new Date(year, month - 1, day);
    return (
      dateObj.getFullYear() === year &&
      dateObj.getMonth() + 1 === month &&
      dateObj.getDate() === day
    );
  };

  const formatDateForAPI = (date: string): string => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading && (
        <View style={styles.progressBar}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../../assets/vol.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <Image source={require('../../assets/odontoprev-logo.png')} style={styles.logo} />

      <Text style={styles.title}>Faça seu Cadastro, Atendente:</Text>

      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        placeholderTextColor="#343232"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>E-mail:</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira seu E-mail"
        placeholderTextColor="#343232"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>RG:</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira seu RG"
        placeholderTextColor="#343232"
        value={rg}
        onChangeText={setRg}
      />

      <Text style={styles.label}>Data de Nascimento:</Text>
      <TextInput
        style={styles.input}
        placeholder="DD/MM/AAAA"
        placeholderTextColor="#343232"
        value={dataNascimento}
        onChangeText={setDataNascimento}
      />

      <Text style={styles.label}>Senha:</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Crie sua senha"
          placeholderTextColor="#343232"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image source={require('../../assets/eye-icon.png')} style={styles.eyeIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Unidade:</Text>
      <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedClinic}
        onValueChange={(itemValue) => setSelectedClinic(itemValue)}
        style={styles.picker}
        itemStyle={styles.pickerItem} // Novo estilo
      >
        <Picker.Item 
          label="Escolha sua Unidade" 
          value={null} 
          style={styles.placeholderItem} // Estilo específico para placeholder
        />
        {clinics.map((clinic) => (
          <Picker.Item key={clinic.id} label={clinic.name} value={clinic.id} />
        ))}
      </Picker>
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleCadastro}>
        <Text style={styles.registerButtonText}>Cadastre-se</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CadastroAtendente;
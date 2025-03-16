import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { buscarClinicas, cadastrarDentista } from '../../api/endpoints';
import styles from './CadastroDentista.styles';

interface Clinic {
  id: number;
  name: string;
}

const CadastroDentista: React.FC = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [selectedClinic, setSelectedClinic] = useState<number | null>(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [rg, setRg] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cro, setCro] = useState('');

  // Buscar clínicas ao carregar a tela
  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      setIsLoading(true);
      const clinicsData = await buscarClinicas();
      setClinics(clinicsData);
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

      // Enviar requisição para cadastrar dentista
      await cadastrarDentista({
        email,
        password: senha,
        name: nome,
        rg,
        birthDate: formattedDate,
        cro,
        role: 'DENTISTA', // Role pré-definido
        clinicId: selectedClinic!,
      });

      // Navegar para a tela de cadastro concluído
      navigation.navigate('CadastroConcluido' as never);
    } catch (error) {
      console.error('Erro ao cadastrar dentista:', error);
      Alert.alert('Erro', 'Não foi possível realizar o cadastro.');
    } finally {
      setIsLoading(false);
    }
  };

  const validateFields = (): boolean => {
    if (!nome || !email || !senha || !rg || !dataNascimento || !cro || !selectedClinic) {
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
      {/* ProgressBar */}
      {isLoading && (
        <View style={styles.progressBar}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}

      {/* Título */}
      <Text style={styles.title}>Cadastro Dentista</Text>

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
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
      <TextInput
        style={styles.input}
        placeholder="RG"
        value={rg}
        onChangeText={setRg}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento (DD/MM/AAAA)"
        value={dataNascimento}
        onChangeText={setDataNascimento}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="CRO"
        value={cro}
        onChangeText={setCro}
      />

      {/* Picker para Clínicas */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedClinic}
          onValueChange={(itemValue) => setSelectedClinic(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Selecione uma clínica" value={null} />
          {clinics.map((clinic) => (
            <Picker.Item key={clinic.id} label={clinic.name} value={clinic.id} />
          ))}
        </Picker>
      </View>

      {/* Botões */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CadastroDentista;
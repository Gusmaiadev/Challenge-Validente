import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchAppointments } from '../../api/endpoints';
import styles from './Consultas.styles';
import { ConsultasRouteProp, ConsultasNavigationProp } from '../../src/navigation/navigationTypes';


// Função para formatar a data no padrão brasileiro (DD/MM/YYYY)
const formatDateToBR = (isoDate: string): string => {
  const dateParts = isoDate.split('-'); // Divide a data em partes [YYYY, MM, DD]
  if (dateParts.length === 3) {
    const [year, month, day] = dateParts;
    return `${day}/${month}/${year}`; // Retorna no formato DD/MM/YYYY
  }
  return isoDate; // Retorna a data original caso não seja possível formatar
};

const Consultas: React.FC = () => {
  const navigation = useNavigation<ConsultasNavigationProp>();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tipoUsuario, setTipoUsuario] = useState<string>('');

  // Carregar tipo de usuário ao iniciar
  useEffect(() => {
    const loadTipoUsuario = async () => {
      const storedTipoUsuario = await AsyncStorage.getItem('tipoUsuario');
      setTipoUsuario(storedTipoUsuario || '');
    };
    loadTipoUsuario();
  }, []);

  // Carregar consultas da API
  useEffect(() => {
    const loadAppointments = async () => {
      setIsLoading(true);
      try {
        const response = await fetchAppointments();
        setAppointments(response);
      } catch (error: any) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAppointments();
  }, []);

  // Função para navegar de volta ao MenuPrincipal
  const handleVoltar = () => {
    navigation.navigate('MenuPrincipal', { tipoUsuario });
  };

  // Função para navegar para AgendamentoConsulta
  const handleAddConsulta = () => {
    navigation.navigate('AgendamentoConsultas' as never);
  };

  // Função para navegar para detalhes da consulta
  const navigateToAppointmentDetails = (appointment: any) => {
    navigation.navigate('ConsultaPaciente', {
      appointmentId: appointment.id,
      patientName: appointment.patient,
      appointmentDate: appointment.dateAppointment,
      appointmentTime: appointment.timeAppointment,
      procedureType: appointment.procedureType,
      clinic: appointment.clinic,
      tipoUsuario,
    });
  };

  // Função para lidar com erros
  const handleError = (error: any) => {
    let errorMessage = 'Erro desconhecido';
    if (error.message) {
      errorMessage = error.message;
    }
    ToastAndroid.show(errorMessage, ToastAndroid.LONG);
  };

  return (
    <View style={styles.container}>
      {/* ProgressBar */}
      {isLoading && (
        <View style={styles.progressBar}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}

      {/* Botão Voltar */}
      <TouchableOpacity onPress={handleVoltar} style={styles.backButton}>
        <Image
          source={require('../../assets/vol.png')} // Substitua pelo caminho correto do ícone
          style={styles.backIcon}
        />
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>Consultas</Text>

      {/* Botão Adicionar Consulta (Visível apenas para atendentes) */}
      {tipoUsuario === 'atendente' && (
        <TouchableOpacity onPress={handleAddConsulta} style={styles.addButton}>
          <Image
            source={require('../../assets/mais.png')} // Substitua pelo caminho correto do ícone
            style={styles.addIcon}
          />
        </TouchableOpacity>
      )}

      {/* Lista de Consultas */}
      {appointments.length > 0 ? (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.appointmentItem}
              onPress={() => navigateToAppointmentDetails(item)}
            >
              <Text style={styles.appointmentText}>Nome: {item.patient}</Text>
              <Text style={styles.appointmentText}>
                Dia: {formatDateToBR(item.dateAppointment)}
              </Text>
              <Text style={styles.appointmentText}>Horário: {item.timeAppointment}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        !isLoading && (
          <Text style={styles.emptyListText}>Nenhuma consulta encontrada</Text>
        )
      )}
    </View>
  );
};

export default Consultas;
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
      {/* Header com botões */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleVoltar}>
          <Image source={require('../../assets/vol.png')} style={styles.backIcon} />
        </TouchableOpacity>

        <Text style={styles.title}>Consultas</Text>

        {tipoUsuario === 'atendente' && (
          <TouchableOpacity onPress={handleAddConsulta}>
            <Image source={require('../../assets/mais.png')} style={styles.addIcon} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.subtitle}>Consultas agendadas:</Text>

      {/* Lista de Consultas */}
      {appointments.length > 0 ? (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.appointmentItem}
              onPress={() => navigateToAppointmentDetails(item)}
            >
              <Text style={styles.appointmentText}>Nome: {item.patient}</Text>
              <Text style={styles.appointmentText}>Data: {formatDateToBR(item.dateAppointment)}</Text>
              <Text style={styles.appointmentText}>Horário: {item.timeAppointment}</Text>
              <TouchableOpacity 
                style={styles.verButton}
                onPress={() => navigateToAppointmentDetails(item)}
              >
                <Text style={styles.verButtonText}>VER</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      ) : (
        !isLoading && <Text style={styles.emptyListText}>Nenhuma consulta encontrada</Text>
      )}

      {/* Loading */}
      {isLoading && (
        <View style={styles.progressBar}>
          <ActivityIndicator size="large" color="#0066FF" />
        </View>
      )}
    </View>
  );
};

export default Consultas;
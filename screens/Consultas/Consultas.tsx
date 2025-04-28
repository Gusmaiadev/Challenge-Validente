import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
  TextInput,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchAppointments, fetchAppointmentsByOdontoPrevId } from '../../api/endpoints';
import styles from './Consultas.styles';
import { ConsultasNavigationProp } from '../../src/navigation/navigationTypes';

const formatDateToBR = (isoDate: string): string => {
  const dateParts = isoDate.split('-');
  if (dateParts.length === 3) {
    const [year, month, day] = dateParts;
    return `${day}/${month}/${year}`;
  }
  return isoDate;
};

const Consultas: React.FC = () => {
  const navigation = useNavigation<ConsultasNavigationProp>();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tipoUsuario, setTipoUsuario] = useState<string>('');
  const [searchId, setSearchId] = useState('');

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [storedTipoUsuario, response] = await Promise.all([
        AsyncStorage.getItem('tipoUsuario'),
        searchId 
          ? fetchAppointmentsByOdontoPrevId(searchId)
          : fetchAppointments()
      ]);
      
      setTipoUsuario(storedTipoUsuario || '');
      setAppointments(response);
    } catch (error: any) {
      handleError(error);
      setAppointments([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchId, loadData]);

  useFocusEffect(
    useCallback(() => {
      if (!searchId) loadData();
      return () => {};
    }, [loadData, searchId])
  );

  const handleVoltar = () => {
    navigation.navigate('MenuPrincipal', { tipoUsuario });
  };

  const handleAddConsulta = () => {
    navigation.navigate('AgendamentoConsultas' as never);
  };

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

  const handleError = (error: any) => {
    const errorMessage = error.message || 'Erro desconhecido';
    ToastAndroid.show(errorMessage, ToastAndroid.LONG);
  };

  return (
    <View style={styles.container}>
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

      {/* Seção de Busca por ID Odontoprev */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ID Odontoprev:</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite o ID Odontoprev"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={searchId}
            onChangeText={setSearchId}
          />
          <TouchableOpacity 
            style={styles.searchButton} 
            onPress={loadData}
          >
            <Image 
              source={require('../../assets/search.png')} 
              style={styles.searchIcon} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.subtitle}>Consultas agendadas:</Text>

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

      {isLoading && (
        <View style={styles.progressBar}>
          <ActivityIndicator size="large" color="#0066FF" />
        </View>
      )}
    </View>
  );
};

export default Consultas;
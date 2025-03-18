// screens/ConsultaPaciente/ConsultaPaciente.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { buscarConsultaPorID } from '../../api/endpoints';
import styles from './ConsultaPaciente.styles';
import { ConsultaPacienteNavigationProp, ConsultaPacienteRouteProp } from '../../src/navigation/navigationTypes';

type ConsultaData = {
  patientName: string;
  appointmentDate: string;
  appointmentTime: string;
  procedureType: string;
};

const ConsultaPaciente: React.FC = () => {
  const navigation = useNavigation<ConsultaPacienteNavigationProp>();
  const route = useRoute<ConsultaPacienteRouteProp>();
  const [isLoading, setIsLoading] = useState(false);
  const [consulta, setConsulta] = useState<ConsultaData | null>(null);

  const { appointmentId, tipoUsuario } = route.params;

  useEffect(() => {
    const carregarConsulta = async () => {
      setIsLoading(true);
      try {
        const response = await buscarConsultaPorID(appointmentId);
        
        setConsulta({
          patientName: response.patient || 'Não informado',
          appointmentDate: response.dateAppointment 
            ? new Date(response.dateAppointment).toLocaleDateString('pt-BR')
            : 'Não informado',
          appointmentTime: response.timeAppointment || 'Não informado',
          procedureType: response.procedureType || 'Não informado',
        });

      } catch (error: any) {
        Alert.alert('Erro', error.message || 'Falha ao carregar consulta');
      } finally {
        setIsLoading(false);
      }
    };

    carregarConsulta();
  }, [appointmentId]);

  const handleIniciarAnalise = () => {
    navigation.navigate('AnaliseConsulta', {
      appointmentId:appointmentId,
      tipoUsuario: tipoUsuario
    });
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.progressBar}>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      )}

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Detalhes da Consulta</Text>

      {consulta ? (
        <>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Paciente:</Text>
            <Text style={styles.value}>{consulta.patientName}</Text>

            <Text style={styles.label}>Data:</Text>
            <Text style={styles.value}>{consulta.appointmentDate}</Text>

            <Text style={styles.label}>Horário:</Text>
            <Text style={styles.value}>{consulta.appointmentTime}</Text>

            <Text style={styles.label}>Procedimento:</Text>
            <Text style={styles.value}>{consulta.procedureType}</Text>
          </View>

          {tipoUsuario === 'dentista' && (
            <TouchableOpacity 
              onPress={handleIniciarAnalise}
              style={styles.actionButton}
            >
              <Text style={styles.buttonText}>Iniciar Análise</Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <Text style={styles.loadingText}>Carregando...</Text>
      )}
    </View>
  );
};

export default ConsultaPaciente;
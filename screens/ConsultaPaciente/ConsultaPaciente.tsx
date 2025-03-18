// screens/ConsultaPaciente/ConsultaPaciente.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { buscarConsultaPorID, iniciarConsulta } from '../../api/endpoints';
import styles from './ConsultaPaciente.styles';
import { ConsultaPacienteNavigationProp, ConsultaPacienteRouteProp } from '../../src/navigation/navigationTypes';

const ConsultaPaciente: React.FC = () => {
  const navigation = useNavigation<ConsultaPacienteNavigationProp>();
  const route = useRoute<ConsultaPacienteRouteProp>();
  const [isLoading, setIsLoading] = useState(false);
  const [consulta, setConsulta] = useState<any>(null);
 

  // Extrair os parâmetros da rota
  const { appointmentId, tipoUsuario } = route.params;
  console.log('Tipo de Usuário:', tipoUsuario);

  // Carregar os dados da consulta ao iniciar
  useEffect(() => {
    carregarConsulta();
  }, []);

  const carregarConsulta = async () => {
    setIsLoading(true);
    try {
      console.log('Buscando consulta por ID:', appointmentId);
      const consultaResponse = await buscarConsultaPorID(appointmentId);
      console.log('Resposta da API:', consultaResponse);

      // Normalizar os dados recebidos da API
      const consultaNormalizada = {
        patientName: consultaResponse.patient || 'Não informado',
        appointmentDate: consultaResponse.dateAppointment || 'Não informado',
        appointmentTime: consultaResponse.timeAppointment || 'Não informado',
        procedureType: consultaResponse.procedureType || 'Não informado',
        clinic: consultaResponse.clinic || 'Não informado',
      };

      setConsulta(consultaNormalizada);
    } catch (error: any) {
      console.error('Erro ao buscar consulta:', error.message || error);
      Alert.alert('Erro', error.message || 'Erro ao buscar consulta');
    } finally {
      setIsLoading(false);
    }
  };

  const handleIniciarConsulta = async () => {
    if (!consulta) {
      Alert.alert('Erro', 'Consulta não encontrada.');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Iniciando consulta...');
      await iniciarConsulta(appointmentId);
      console.log('Consulta iniciada com sucesso');

      // Exibir mensagem de sucesso
      Alert.alert('Sucesso', 'Consulta iniciada com sucesso');
    } catch (error: any) {
      console.error('Erro ao iniciar consulta:', error.message || error);
      Alert.alert('Erro', error.message || 'Erro ao iniciar consulta');
    } finally {
      setIsLoading(false);
    }
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
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>Detalhes da Consulta</Text>

      {/* Dados da Consulta */}
      {consulta ? (
        <>
          <Text style={styles.label}>Nome do Paciente:</Text>
          <Text style={styles.value}>{consulta.patientName}</Text>

          <Text style={styles.label}>Data da Consulta:</Text>
          <Text style={styles.value}>{consulta.appointmentDate}</Text>

          <Text style={styles.label}>Horário da Consulta:</Text>
          <Text style={styles.value}>{consulta.appointmentTime}</Text>

          <Text style={styles.label}>Procedimento:</Text>
          <Text style={styles.value}>{consulta.procedureType}</Text>

          <Text style={styles.label}>Clínica:</Text>
          <Text style={styles.value}>{consulta.clinic}</Text>

          {/* Botão Iniciar Consulta */}
          {tipoUsuario === 'dentista' && (
            <TouchableOpacity onPress={handleIniciarConsulta} style={styles.button}>
              <Text style={styles.buttonText}>Iniciar Consulta</Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <Text style={styles.emptyListText}>Carregando detalhes da consulta...</Text>
      )}
    </View>
  );
  
};

export default ConsultaPaciente;